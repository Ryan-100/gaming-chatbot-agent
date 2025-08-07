'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import dayjs from '../../../../../../utils/dayjs';
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../../../shared/data-table';
import { DatePicker } from '../../../../../ui/date-picker';
import Loading from '../../../../../ui/loading';
import { columnDefs } from './components/ColumnDefs';
import { useGetGameActivityByPlayerQuery } from '../../../../../../stores/reducers/game-activity.reducer';

const GameActivity = () => {
  const { id } = useParams<{ id: string }>();

  const [query, setQuery] = React.useState({
    id,
    pageIndex: 1,
    rowPerPage: 20,
    date: dayjs().format('YYYY-MM-DD'),
  });

  const { data, isLoading } = useGetGameActivityByPlayerQuery(query);

  const handleDateChange = (date: Date | undefined) => {
    setQuery({
      id: query.id,
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      date: date
        ? dayjs(date).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
    });
  };
  const handlePageChange = (page: number) => {
    setQuery({
      id: query.id,
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      date: query.date,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="12px">
      <Flex gapX="8px" className="w-1/8">
        <DatePicker
          date={new Date(query.date)}
          setDate={handleDateChange}
          dateFormat="D/MMM/YYYY"
          className="max-w-[149px] bg-background"
          label="Select Date"
        />
      </Flex>
      <Box>
        <DataTable
          data={data?.body?.data ?? []}
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
    </Flex>
  );
};

export default GameActivity;
