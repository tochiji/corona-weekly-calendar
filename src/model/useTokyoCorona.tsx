import { eachWeekOfInterval } from 'date-fns';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import Worker from './../worker';
import {
  CoronaContextType,
  DaysData,
  Interval,
  ProviderProps,
  TokyoCoronaData,
  WeekStartsOn,
} from './typing';

const URL = 'https://storage.googleapis.com/corona-open-data/tokyo-latest';

const initInterVal: Interval = {
  start: new Date(),
  end: new Date(),
};

const CoronaContext = createContext<CoronaContextType>({
  isLoading: false,
  startWeekOfDays: 0,
  weeks: [],
  yobis: [],
  interval: initInterVal,
  tokyoData: [],
  daysData: {},
  setStartWeekOfDay: () => undefined,
});

export const CoronaProvider = ({ children }: ProviderProps) => {
  const [tokyoData, setTokyoData] = useState<TokyoCoronaData>([]);
  const [interval, setInterval] = useState<Interval>(initInterVal);
  const [weeks, setWeeks] = useState<Date[]>([]);
  const [startWeekOfDays, setStartWeekOfDay] = useState<WeekStartsOn>(0);
  const [daysData, setDaysData] = useState<DaysData>({});
  const [isLoading, setIsLoading] = useState(true);

  const worker = new Worker();

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      const res = await fetch(URL);
      const resjson = (await res.json()) as TokyoCoronaData;
      const { tokyoData, interval } = await worker.initData(resjson);
      const weeks = eachWeekOfInterval(interval, {
        weekStartsOn: startWeekOfDays,
      }).reverse();
      const daysData = await worker.makeDailyCount({
        tokyoData,
        weeks,
        startWeekOfDays,
      });

      setInterval(interval);
      setWeeks(weeks);
      setTokyoData(tokyoData);
      setDaysData(daysData);
      setIsLoading(false);
    };
    handleRequest();
  }, []);

  const yobis = useMemo(() => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return [...days, ...days].splice(startWeekOfDays, 7);
  }, [startWeekOfDays]);

  return (
    <CoronaContext.Provider
      value={{
        isLoading,
        startWeekOfDays,
        weeks,
        yobis,
        interval,
        tokyoData,
        daysData,
        setStartWeekOfDay,
      }}
    >
      {children}
    </CoronaContext.Provider>
  );
};

export const useCorona = () => useContext(CoronaContext);
