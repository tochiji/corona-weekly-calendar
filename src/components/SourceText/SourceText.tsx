import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    fontSize: 10,
    margin: theme.spacing(2, 2, 2, 2),
    textAlign: 'left',
  },
}));

const URL =
  'https://catalog.data.metro.tokyo.lg.jp/dataset/t000010d0000000068/resource/c2d997db-1450-43fa-8037-ebb11ec28d4c';

export const SourceText = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.root}>
      ※データは「
      <a href={URL} rel="noreferrer noopener" target="_blank">
        東京都オープンデータカタログサイト
        東京都_新型コロナウイルス陽性患者発表詳細
      </a>
      」 より
    </Typography>
  );
};
