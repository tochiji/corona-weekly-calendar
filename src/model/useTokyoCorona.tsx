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
  Interval,
  ProviderProps,
  TokyoCoronaData,
  WeekStartsOn,
  WeekTable,
} from './typing';

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
  rawData: [],
  weekTable: {},
  setStartWeekOfDay: () => undefined,
});

export const CoronaProvider = ({ children }: ProviderProps) => {
  const [rawData, setRawData] = useState<TokyoCoronaData>([]);
  const [interval, setInterval] = useState<Interval>(initInterVal);
  const [weeks, setWeeks] = useState<Date[]>([]);
  const [startWeekOfDays, setStartWeekOfDay] = useState<WeekStartsOn>(0);
  const [weekTable, setWeekTable] = useState<WeekTable>({});
  const [isLoading, setIsLoading] = useState(true);

  const worker = new Worker();

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      const { rawData, interval, weeks, weekTable } = await worker.initData({
        startWeekOfDays,
      });

      setInterval(interval);
      setWeeks(weeks);
      setRawData(rawData);
      setWeekTable(weekTable);
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
        rawData,
        weekTable,
        setStartWeekOfDay,
      }}
    >
      {children}
    </CoronaContext.Provider>
  );
};

export const useCorona = () => useContext(CoronaContext);
