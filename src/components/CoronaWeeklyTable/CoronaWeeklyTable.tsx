import React from 'react';
import { useCorona } from '../../model/useTokyoCorona';

export const CoronaWeeklyTable = () => {
  const { tokyoData } = useCorona();
  return <div>{tokyoData.length}</div>;
};
