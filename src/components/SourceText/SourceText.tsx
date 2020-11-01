import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    fontSize: 8,
    margin: theme.spacing(2, 2, 2, 2),
    textAlign: 'left',
  },
}));

export const SourceText = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.root}>
      ※データは「東京都オープンデータカタログサイト
      東京都_新型コロナウイルス陽性患者発表詳細」 より
    </Typography>
  );
};
