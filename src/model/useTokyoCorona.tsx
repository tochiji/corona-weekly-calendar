import React, { createContext, useState, useContext, useEffect } from 'react';

const CoronaContext = createContext({});
const URL = 'https://storage.googleapis.com/corona-open-data/tokyo-latest';

export const CoronaProvider = ({ children }: ProviderProps) => {
  const [tokyoData, setTokyoData] = useState<TokyoCoronaData>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      const res = ((await fetch(URL)) as unknown) as TokyoCoronaData;
      setTokyoData(res);
      setIsLoading(false);
    };
    handleRequest();
  }, []);

  return (
    <CoronaContext.Provider value={{ tokyoData, isLoading }}>
      {children}
    </CoronaContext.Provider>
  );
};

export const useCorona = () => useContext(CoronaContext);

interface ProviderProps {
  children: React.ReactNode;
}

type TokyoCoronaData = {
  都道府県名: string;
  公表_年月日: string;
  曜日: '月' | '火' | '水' | '木' | '金' | '土' | '日';
  患者_居住地: string;
  患者_年代: string;
  患者_性別: '男性' | '女性';
  退院済フラグ: undefined | 1;
}[];
