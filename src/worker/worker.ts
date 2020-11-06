import { format, getDay, max, min, parseISO, startOfWeek } from 'date-fns';
import { MakeDailyCountProps, TokyoCoronaData } from '../model/typing';

export const initData = (data: TokyoCoronaData) => {
  const dateSet = new Set() as Set<Date>;
  const tokyoData = data.map(v => {
    const date = parseISO(v['公表_年月日']);
    dateSet.add(date);
    return { ...v, date: date };
  });

  const interval = { start: min([...dateSet]), end: max([...dateSet]) };

  return { tokyoData, interval };
};

export const makeDailyCount = ({
  tokyoData,
  weeks,
  startWeekOfDays,
}: MakeDailyCountProps) => {
  const dataWithWeek = tokyoData.map(v => ({
    ...v,
    week: startOfWeek(v.date, { weekStartsOn: startWeekOfDays }),
    dayOfWeek: (getDay(v.date) + 7 - startWeekOfDays) % 7,
  }));

  const dailyCount = {} as { [key: string]: (number | null)[] };
  weeks.forEach(v => {
    const week = format(v, 'yyyyMMdd');
    dailyCount[week] = [null, null, null, null, null, null, null];
  });
  dataWithWeek.forEach(v => {
    const week = format(v.week, 'yyyyMMdd');
    const day = v.dayOfWeek;
    dailyCount[week][day] = Number(dailyCount[week][day]) + 1;
  });
  return dailyCount;
};
