import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import logo from './logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
    height: 56,
    margin: theme.spacing(3, 0, 0, 0),
    background: 'rgba(92, 92, 92, 0.46)',
  },
  logo: {
    height: 28,
  },
  text: {
    color: 'white',
    marginLeft: 11,
  },
}));

export const HeaderTitle = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <img src={logo} className={classes.logo} alt="logo" />
      <Typography className={classes.text}>非公式コロナカレンダー</Typography>
    </Box>
  );
};
