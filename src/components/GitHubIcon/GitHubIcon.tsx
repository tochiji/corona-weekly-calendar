import { makeStyles } from '@material-ui/core';
import React from 'react';
import gitlogo from './GitHub-Mark-Light-120px-plus.png';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 2, 2, 2),
    textAlign: 'center',
  },
  github: {
    width: 30,
  },
}));

const GITHUB_URL = 'https://github.com/tochiji/corona-weekly-calendar/';

export const GitHubIcon = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <a href={GITHUB_URL} rel="noreferrer noopener" target="_blank">
        <img src={gitlogo} className={classes.github} />
      </a>
    </div>
  );
};
