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

const TransactionHistory = () => {
  const params = useParams<{ id: string }>();

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    id: params.id,
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
      pageIndex: 1,
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
      <Flex
        align="center"
        justify="start"
        className="gap-2 relative lg:w-1/2 flex-wrap"
      >
        <DatePicker
          date={new Date(query.date)}
          setDate={handleDateChange}
          dateFormat="D/MMM/YYYY"
          className="min-w-[149px] max-w-[149px] bg-background"
          label="Select Date"
        />
        <Select
          defaultValue="ALL"
          value={query.status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="min-w-[149px] max-w-[149px] text-text-invert bg-primary">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[149px] max-w-[149px] bg-background">
            <SelectGroup>
              <SelectItem value={'ALL'}>All Status</SelectItem>
              <SelectItem value={'DEPOSIT'}>Deposit</SelectItem>
              <SelectItem value={'WITHDRAW'}>Withdraw</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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

export default TransactionHistory;
