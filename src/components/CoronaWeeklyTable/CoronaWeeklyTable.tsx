import {
  Box,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useCorona } from '../../model/useTokyoCorona';

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: 600,
    margin: theme.spacing(0, 0, 3, 0),
    '& .MuiTableCell-root': {
      padding: '6px 4px 4px 4px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
      borderBottom: '1px solid rgba(255,255,255,0.2)',
    },
  },
}));

export const CoronaWeeklyTable = () => {
  const classes = useStyles();
  const { isLoading, weeks, yobis, weekTable } = useCorona();

  if (isLoading)
    return (
      <CircularProgress style={{ margin: '30px 0 30px 0', color: 'white' }} />
    );
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ width: '100%' }}
    >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {yobis.map(v => (
              <TableCell key={v} align="center">
                {v}
              </TableCell>
            ))}
            <TableCell align="center">週計</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((w, i) => {
            const week = format(w, 'yyyyMMdd');
            return (
              <TableRow key={week}>
                <TableCell align="right">{format(w, 'MM/dd')}</TableCell>
                {weekTable[week].map((d, d_i) => (
                  <TableCell key={`${w}-${i}-${d_i}`} align="right">
                    {d}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};
