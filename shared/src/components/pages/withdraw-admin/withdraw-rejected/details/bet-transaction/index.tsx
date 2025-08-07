'use client';
import React from 'react';
import dayjs from '../../../../../../utils/dayjs';
import { useParams } from 'next/navigation';
import { Flex } from '@radix-ui/themes';
import { DatePicker } from '../../../../../ui/date-picker';
import Loading from '../../../../../ui/loading';
import { DataTable } from '../../../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetGameActivityByPlayerQuery } from '../../../../../../stores/reducers/game-activity.reducer';

const WithdrawRejectedBetTransaction = () => {
  const { playerId } = useParams<{ playerId: string }>();

  const [query, setQuery] = React.useState({
    id: playerId,
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
    <Flex direction="column" gapY="16px">
      <Flex gapX="8px" className="w-1/8">
        <DatePicker
          date={new Date(query.date)}
          setDate={handleDateChange}
          dateFormat="D/MMM/YYYY"
          className="max-w-[149px] bg-background"
          label="Select Date"
        />
      </Flex>
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
    </Flex>
  );
};

export default WithdrawRejectedBetTransaction;
