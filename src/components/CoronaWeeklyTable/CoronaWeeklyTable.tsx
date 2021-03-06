import {
  Box,
  CircularProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useCorona } from '../../model/useTokyoCorona';
import { severity } from '../../model/severity';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  tableContainer: {
    maxWidth: 600,
    margin: theme.spacing(0, 0, 1, 0),
    padding: theme.spacing(1, 2, 2, 2),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderCollapse: 'separate',
    '& th': {
      padding: '6px 4px 4px 4px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
      borderBottom: 'none',
    },
    '& td': {
      padding: '6px 4px 4px 4px',
      color: '#222222',
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: '#eeeeee',
      border: 'none',
      '&[data-sd="1"]': {
        backgroundColor: '#FFDEB8',
      },
      '&[data-sd="2"]': {
        backgroundColor: '#FF7272',
      },
      '&[data-sd="3"]': {
        backgroundColor: '#EA0000',
        color: 'white',
      },
      '&[data-sd="4"]': {
        backgroundColor: '#910400',
        color: 'white',
      },
    },
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: '2px',
  },
}));

export const CoronaWeeklyTable = () => {
  const classes = useStyles();
  const { isLoading, weeks, yobiHeader, weekTable, weekSumTable } = useCorona();

  if (isLoading)
    return (
      <CircularProgress style={{ margin: '30px 0 30px 0', color: 'white' }} />
    );
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {yobiHeader.map(v => (
                <TableCell key={v} align="center">
                  {v}
                </TableCell>
              ))}
              <TableCell align="center">週計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((w, w_i) => {
              const week = format(w, 'yyyyMMdd');
              return (
                <TableRow key={week}>
                  <TableCell align="center" component="th">
                    {format(w, 'MM/dd')}
                  </TableCell>
                  {weekTable[week].map((d, d_i) => (
                    <TableCell
                      key={`${week}-${d_i}`}
                      data-sd={severity(d.count)}
                      align="right"
                    >
                      {(w_i === 0 && d.count) || w_i !== 0
                        ? d.count.toLocaleString()
                        : null}
                    </TableCell>
                  ))}
                  <TableCell key={`${week}-sum`} align="right">
                    {weekSumTable[week].count.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
