'use client';
import React, { useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { DatePicker } from '../../../ui/date-picker';
import { columnDefs } from './components/ColumnDefs';
import { useGetExpirePMQuery } from '../../../../stores/reducers/pocket-money.reducer';
import Loading from '../../../ui/loading';
import dayjs from '../../../../utils/dayjs';
import { toast } from 'sonner';
import { PAGINATION } from '../../../../data/constants';

const DATE_FORMAT = 'YYYY-MM-DD';

const PocketMoneyHistory = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [query, setQuery] = useState({
    date: '',
    pageIndex: PAGINATION.defaultPage,
    rowPerPage: PAGINATION.rowPerPage,
  });
  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useGetExpirePMQuery(query);

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loading />
      </div>
    );
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setQuery((prev) => ({
        ...prev,
        pageIndex: PAGINATION.defaultPage,
        date: dayjs(date).format(DATE_FORMAT),
      }));
    }
  };

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  };

  if (isError) {
    const error: any = apiError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Flex direction="column" gapY="12px" className="">
      <Flex justify="start" align="center">
        <DatePicker
          className="bg-background w-1/4 min-w-[159px]"
          setDate={handleDateChange}
          dateFormat={DATE_FORMAT}
          date={date}
        />
      </Flex>
      {data?.body?.data && (
        <Box>
          <DataTable
            data={data.body.data}
            columns={columnDefs}
            query={{
              pageIndex: query.pageIndex,
              rowPerPage: query.rowPerPage,
              total: data?.body?.total ?? 0,
              pageCount: data?.body?.pageCount ?? 0,
            }}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Flex>
  );
};

export default PocketMoneyHistory;
