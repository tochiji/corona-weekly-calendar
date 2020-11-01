import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    fontSize: 8,
    margin: theme.spacing(2, 2, 2, 2),
  },
}));

export const DescriptionText = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.root}>
      このサイトは東京都が運営するものではありません。東京都のコロナ発生状況をカレンダー形式で伝えるために、個人で制作・運営しているものです。
    </Typography>
  );
};
