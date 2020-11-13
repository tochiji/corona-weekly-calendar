import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 2, 2, 2),
    textAlign: 'center',
  },
  text: {
    textAlign: 'left',
    fontSize: 10,
    color: 'white',
  },
}));

const SOURCE_URL =
  'https://catalog.data.metro.tokyo.lg.jp/dataset/t000010d0000000068/resource/c2d997db-1450-43fa-8037-ebb11ec28d4c';

export const SourceText = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.text}>
        ※データは「
        <a href={SOURCE_URL} rel="noreferrer noopener" target="_blank">
          東京都オープンデータカタログサイト
          東京都_新型コロナウイルス陽性患者発表詳細
        </a>
        」 より
      </Typography>
    </div>
  );
};
