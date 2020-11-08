import {
  eachWeekOfInterval,
  format,
  getDay,
  max,
  min,
  parseISO,
  startOfWeek,
} from 'date-fns';
import {
  CreateWeekTableProps,
  InitWorkerDataProps,
  TokyoCoronaData,
  WeekStartsOn,
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

  const { weeks, weekTable, weekSumTable } = createWeekTable({
    rawData,
    interval,
    startWeekOfDays,
  });

  return { rawData, interval, weeks, weekTable, weekSumTable };
};

export const createWeekTable = ({
  rawData,
  interval,
  startWeekOfDays,
}: CreateWeekTableProps) => {
  const weeks = getWeeks(interval, startWeekOfDays);

  const dataWithWeek = rawData.map(v => ({
    ...v,
    week: startOfWeek(v.date, { weekStartsOn: startWeekOfDays }),
    dayOfWeek: (getDay(v.date) + 7 - startWeekOfDays) % 7,
  }));

  const weekTable = {} as { [key: string]: (number | null)[] };
  const weekSumTable = {} as { [key: string]: number };

  weeks.forEach(v => {
    const week = format(v, 'yyyyMMdd');
    weekTable[week] = [null, null, null, null, null, null, null];
    weekSumTable[week] = 0;
  });
  dataWithWeek.forEach(v => {
    const week = format(v.week, 'yyyyMMdd');
    const day = v.dayOfWeek;

    weekTable[week][day] = Number(weekTable[week][day]) + 1;
    weekSumTable[week] = weekSumTable[week] + 1;
  });
  return { weeks, weekTable, weekSumTable };
};

const getWeeks = (interval: Interval, startWeekOfDays: WeekStartsOn) => {
  const weeks = eachWeekOfInterval(interval, {
    weekStartsOn: startWeekOfDays,
  }).reverse();

  return weeks;
};
