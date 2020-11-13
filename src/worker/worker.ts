import {
  differenceInCalendarDays,
  eachWeekOfInterval,
  format,
  getDay,
  max,
  min,
  parseISO,
  startOfWeek,
} from 'date-fns';
import { mean, standardDeviation } from 'simple-statistics';
import {
  CreateWeekTableProps,
  InitWorkerDataProps,
  StatDayProps,
  TokyoCoronaData,
  WeekStartsOn,
  WeekSumTable,
  WeekTable,
} from '../model/typing';

const URL = 'https://storage.googleapis.com/corona-open-data/tokyo-latest';

export const initData = async ({ startWeekOfDays }: InitWorkerDataProps) => {
  const res = await fetch(URL);
  const resJson = (await res.json()) as TokyoCoronaData;

  const dateSet = new Set() as Set<Date>;
  const rawData = resJson.map(v => {
    const date = parseISO(v['公表_年月日']);
    dateSet.add(date);
    return { ...v, date: date };
  });
  const interval = { start: min([...dateSet]), end: max([...dateSet]) };

  const { meanDay, sdDay } = statDay({
    rawData,
    interval,
  });

  const { weeks, weekTable, weekSumTable } = createWeekTable({
    rawData,
    interval,
    startWeekOfDays,
    meanDay,
    sdDay,
  });

  return { rawData, interval, weeks, weekTable, weekSumTable };
};

const statDay = ({ rawData, interval }: StatDayProps) => {
  const dayCount = differenceInCalendarDays(interval.end, interval.start) + 1;
  const days = Array(dayCount).fill(0) as number[];

  rawData.forEach(v => {
    const idx = differenceInCalendarDays(v.date, interval.start);
    days[idx] += 1;
  });

  const meanDay = mean(days);
  const sdDay = standardDeviation(days);

  return { meanDay, sdDay };
};

export const createWeekTable = ({
  rawData,
  interval,
  startWeekOfDays,
  meanDay,
  sdDay,
}: CreateWeekTableProps) => {
  const weeks = getWeeks(interval, startWeekOfDays);

  const dataWithWeek = rawData.map(v => ({
    ...v,
    week: startOfWeek(v.date, { weekStartsOn: startWeekOfDays }),
    dayOfWeek: (getDay(v.date) + 7 - startWeekOfDays) % 7,
  }));

  const weekTable = {} as WeekTable;
  const weekSumTable = {} as WeekSumTable;

  weeks.forEach(v => {
    const week = format(v, 'yyyyMMdd');
    const item = { count: 0, sd: 0 };
    weekTable[week] = new Array(7).fill(0).map(() => {
      return { ...item };
    });
    weekSumTable[week] = { ...item };
  });

  dataWithWeek.forEach(v => {
    const week = format(v.week, 'yyyyMMdd');
    const day = v.dayOfWeek;

    weekTable[week][day].count = Number(weekTable[week][day].count) + 1;
    weekSumTable[week].count = weekSumTable[week].count + 1;
  });

  for (const w in weekTable) {
    weekTable[w].forEach((v, i) => {
      const cnt = weekTable[w][i].count;
      weekTable[w][i].sd = Math.floor((cnt - meanDay) / sdDay);
    });
  }

  return { weeks, weekTable, weekSumTable };
};

const getWeeks = (interval: Interval, startWeekOfDays: WeekStartsOn) => {
  const weeks = eachWeekOfInterval(interval, {
    weekStartsOn: startWeekOfDays,
  }).reverse();

  return weeks;
};
