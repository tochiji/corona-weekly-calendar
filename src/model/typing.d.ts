export type CoronaContextType = {
  isLoading: boolean;
  startWeekOfDays: WeekStartsOn;
  weeks: Date[];
  yobis: string[];
  interval: Interval;
  rawData: TokyoCoronaData;
  weekTable: WeekTable;
  setStartWeekOfDay: (s: WeekStartsOn) => void;
};

export type TokyoCoronaData = {
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

export type WeekTable = { [key: string]: (number | null)[] };

export type Interval = {
  start: Date;
  end: Date;
};

export type InitWorkerData = {
  rawData: TokyoCoronaData;
  interval: Interval;
  weeks: Date[];
  weekTable: WeekTable;
};

export type InitWorkerDataProps = {
  startWeekOfDays: WeekStartsOn;
};

export type CreateWeekTable = {
  weeks: Date[];
  weekTable: WeekTable;
};

export type CreateWeekTableProps = {
  rawData: TokyoCoronaData;
  interval: Interval;
  startWeekOfDays: WeekStartsOn;
};

export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ProviderProps {
  children: React.ReactNode;
}
