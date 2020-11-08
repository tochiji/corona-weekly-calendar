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
  ProviderProps,
  WeekStartsOn,
  WeekSumTable,
  WeekTable,
} from './typing';

const CoronaContext = createContext<CoronaContextType>({
  isLoading: false,
  startWeekOfDays: 0,
  weeks: [],
  yobiHeader: [],
  weekTable: {},
  weekSumTable: {},
  setStartWeekOfDay: () => undefined,
});

export const CoronaProvider = ({ children }: ProviderProps) => {
  const [weeks, setWeeks] = useState<Date[]>([]);
  const [startWeekOfDays, setStartWeekOfDay] = useState<WeekStartsOn>(0);
  const [weekTable, setWeekTable] = useState<WeekTable>({});
  const [weekSumTable, setWeekSumTable] = useState<WeekSumTable>({});
  const [isLoading, setIsLoading] = useState(true);

  const worker = new Worker();

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      const { weeks, weekTable, weekSumTable } = await worker.initData({
        startWeekOfDays,
      });

      setWeeks(weeks);
      setWeekTable(weekTable);
      setWeekSumTable(weekSumTable);
      setIsLoading(false);
    };
    handleRequest();
  }, []);

  const yobiHeader = useMemo(() => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return [...days, ...days].splice(startWeekOfDays, 7);
  }, [startWeekOfDays]);

  return (
    <CoronaContext.Provider
      value={{
        isLoading,
        startWeekOfDays,
        weeks,
        yobiHeader,
        weekTable,
        weekSumTable,
        setStartWeekOfDay,
      }}
    >
      {children}
    </CoronaContext.Provider>
  );
};

export const useCorona = () => useContext(CoronaContext);
