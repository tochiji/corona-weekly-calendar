import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles(() => ({
  root: {
    background: 'rgba(255, 255, 255, 0.22)',
    borderRadius: '3px',
    color: 'white',
    fontWeight: 'bold',
  },
}));

export const ClipboardButton = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      disableElevation
      className={classes.root}
      startIcon={<AssignmentIcon />}
    >
      クリップボードにコピーする
    </Button>
  );
};
