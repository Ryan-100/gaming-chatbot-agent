'use client';
import React from 'react';
import dayjs from '../../../../../../utils/dayjs';
import { useParams } from 'next/navigation';
import { Flex } from '@radix-ui/themes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import { DatePicker } from '../../../../../ui/date-picker';
import Loading from '../../../../../ui/loading';
import { DataTable } from '../../../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetTransactionHistoryByPlayerQuery } from '../../../../../../stores/reducers/transaction-by-player.reducer';

const WithdrawRejectedTransactionHistory = () => {
  const params = useParams<{ playerId: string }>();

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    id: params.playerId,
    date: dayjs().format('YYYY-MM-DD'),
    status: 'ALL',
  });

  const { data, isLoading } = useGetTransactionHistoryByPlayerQuery(query);

  const handleDateChange = (date: Date | undefined) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      id: query.id,
      status: query.status,
      date: date
        ? dayjs(date).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
    });
  };

  const handleStatusChange = (value: string) => {
    setQuery({
      pageIndex: query.pageIndex,
      rowPerPage: query.rowPerPage,
      id: query.id,
      date: query.date,
      status: value,
    });
  };

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      id: query.id,
      date: query.date,
      status: query.status,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="16px">
      <Flex align="center" justify="start" className="gap-4 relative w-1/2">
        <Select
          defaultValue="ALL"
          value={query.status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="max-w-[129px] bg-background">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="max-w-[129px] bg-background">
            <SelectGroup>
              <SelectItem value={'ALL'}>All</SelectItem>
              <SelectItem value={'DEPOSIT'}>Deposit</SelectItem>
              <SelectItem value={'WITHDRAW'}>Withdraw</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DatePicker
          date={new Date(query.date)}
          setDate={handleDateChange}
          dateFormat="D/MMM/YYYY"
          className="max-w-[149px] bg-background"
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
        isShowNo
      />
    </Flex>
  );
};

export default WithdrawRejectedTransactionHistory;
