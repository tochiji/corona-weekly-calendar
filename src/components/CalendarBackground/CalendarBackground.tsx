import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    background: 'rgba(92, 92, 92, 0.46)',
    padding: theme.spacing(4, 1, 4, 1),
  },
}));

export const CalendarBackground = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className={classes.root}
    >
      {children}
    </Box>
  );
};

interface Props {
  children: React.ReactNode;
}