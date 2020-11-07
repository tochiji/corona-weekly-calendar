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
  const { weeks, weekTable } = createWeekTable({
    rawData,
    interval,
    startWeekOfDays,
  });

  return { rawData, interval, weeks, weekTable };
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
  weeks.forEach(v => {
    const week = format(v, 'yyyyMMdd');
    weekTable[week] = [null, null, null, null, null, null, null];
  });
  dataWithWeek.forEach(v => {
    const week = format(v.week, 'yyyyMMdd');
    const day = v.dayOfWeek;
    weekTable[week][day] = Number(weekTable[week][day]) + 1;
  });
  return { weeks, weekTable };
};

const getWeeks = (interval: Interval, startWeekOfDays: WeekStartsOn) => {
  const weeks = eachWeekOfInterval(interval, {
    weekStartsOn: startWeekOfDays,
  }).reverse();

  return weeks;
};
