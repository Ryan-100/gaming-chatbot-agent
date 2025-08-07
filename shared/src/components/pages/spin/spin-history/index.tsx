'use client';
import React, { useState } from 'react';
import { Box } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { columnDef } from './components/ColumnDef';
import MonthPicker from '../../../ui/month-picker';
import { useGetSpinHistoryListQuery } from '../../../../stores/reducers/spin-history.reducer';
import Loading from '../../../ui/loading';
import dayjs from '../../../../utils/dayjs';
import { toast } from 'sonner';

const DATE_FORMAT = 'YYYY-MM';

const SpinHistory = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [query, setQuery] = useState({
    // pageIndex: 1,
    // rowPerPage: 20,
    date: dayjs().format(DATE_FORMAT),
  });

  const {
    data,
    isLoading,
    isError,
    error: spinHistoryError,
  } = useGetSpinHistoryListQuery(query);

  // const handlePageChange = (page: number) => {
  //   setQuery({ pageIndex: page, rowPerPage: query.rowPerPage });
  // };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDate(date);
      setQuery((prev) => ({
        // ...prev,
        date: dayjs(date).format(DATE_FORMAT),
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    const error: any = spinHistoryError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Box className="space-y-4">
      <Box className="w-[150px]">
        <MonthPicker
          className="bg-background w-[150px]"
          onChange={handleDateChange}
          date={date}
          enableMonth
        />
      </Box>

      <Box>
        {data?.body && (
          <DataTable data={data?.body?.data} columns={columnDef} />
        )}
      </Box>
    </Box>
  );
};

export default SpinHistory;
