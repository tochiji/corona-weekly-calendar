import {
  eachWeekOfInterval,
  format,
  getDay,
  max,
  min,
  parseISO,
  startOfWeek,
} from 'date-fns';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';

const URL = 'https://storage.googleapis.com/corona-open-data/tokyo-latest';
const CoronaContext = createContext<CoronaContext>({
  isLoading: false,
  startWeekOfDays: 0,
  weeks: [],
  yobis: [],
  daysData: {},
  setStartWeekOfDay: () => undefined,
});

type CoronaContext = {
  isLoading: boolean;
  startWeekOfDays: WeekStartsOn;
  weeks: Date[];
  yobis: string[];
  daysData: { [key: string]: (number | null)[] };
  setStartWeekOfDay: (s: WeekStartsOn) => void;
};

export const CoronaProvider = ({ children }: ProviderProps) => {
  const [tokyoData, setTokyoData] = useState<TokyoCoronaData>([]);
  const [interval, setInterval] = useState<Interval>(initInterVal);
  const [startWeekOfDays, setStartWeekOfDay] = useState<WeekStartsOn>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      const res = await fetch(URL);
      const resjson = (await res.json()) as TokyoCoronaData;
      const dateSet = new Set() as Set<Date>;
      const tokyoData = resjson.map(v => {
        const date = parseISO(v['公表_年月日']);
        dateSet.add(date);
        return { ...v, date: date };
      });
      setInterval({ start: min([...dateSet]), end: max([...dateSet]) });
      setTokyoData(tokyoData);
      setIsLoading(false);
    };
    handleRequest();
  }, []);

  const weeks = useMemo(
    () =>
      eachWeekOfInterval(interval, { weekStartsOn: startWeekOfDays }).reverse(),
    [interval]
  );

  const yobis = useMemo(() => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return [...days, ...days].splice(startWeekOfDays, 7);
  }, [startWeekOfDays]);

  const daysData = useMemo(() => {
    const dataWithWeek = tokyoData.map(v => ({
      ...v,
      week: startOfWeek(v.date, { weekStartsOn: startWeekOfDays }),
      dayOfWeek: (getDay(v.date) + 7 - startWeekOfDays) % 7,
    }));

    const weekMap = {} as { [key: string]: (number | null)[] };
    weeks.forEach(v => {
      const week = format(v, 'yyyyMMdd');
      weekMap[week] = [null, null, null, null, null, null, null];
    });
    dataWithWeek.forEach(v => {
      const week = format(v.week, 'yyyyMMdd');
      const day = v.dayOfWeek;
      weekMap[week][day] = Number(weekMap[week][day]) + 1;
    });
    return weekMap;
  }, [tokyoData, weeks, startWeekOfDays]);

  return (
    <CoronaContext.Provider
      value={{
        isLoading,
        startWeekOfDays,
        weeks,
        yobis,
        daysData,
        setStartWeekOfDay,
      }}
    >
      {children}
    </CoronaContext.Provider>
  );
};

export const useCorona = () => useContext(CoronaContext);

interface ProviderProps {
  children: React.ReactNode;
}

type TokyoCoronaData = {
  No: string;
  都道府県名: string;
  公表_年月日: string;
  曜日: '月' | '火' | '水' | '木' | '金' | '土' | '日';
  患者_居住地: string;
  患者_年代: string;
  患者_性別: '男性' | '女性';
  退院済フラグ: undefined | 1;
  date: Date;
}[];

type Interval = {
  start: Date;
  end: Date;
};

const initInterVal = {
  start: new Date(),
  end: new Date(),
};

type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;
