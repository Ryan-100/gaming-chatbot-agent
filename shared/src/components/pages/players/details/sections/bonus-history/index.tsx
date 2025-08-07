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
import { columnDefs } from './components/ColumnDefs';
import { DataTable } from '../../../../../shared/data-table';
import { useGetBonusHistoryByPlayerQuery } from '../../../../../../stores/reducers/bonus-history.reducer';

const BonusHistory = () => {
  const { id } = useParams<{ id: string }>();

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    date: dayjs().format('YYYY-MM-DD'),
    bonusStatus: 'ALL',
  });

  const { data, isLoading } = useGetBonusHistoryByPlayerQuery({ id, query });

  const handleDateChange = (date: Date | undefined) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      bonusStatus: query.bonusStatus,
      date: date
        ? dayjs(date).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
    });
  };

  const handleStatusChange = (value: string) => {
    setQuery({
      pageIndex: query.pageIndex,
      rowPerPage: query.rowPerPage,
      date: query.date,
      bonusStatus: value,
    });
  };

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      date: query.date,
      bonusStatus: query.bonusStatus,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="12px">
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
          value={query.bonusStatus}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="min-w-[149px] max-w-[149px] text-text-invert bg-primary">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[149px] max-w-[149px] bg-background">
            <SelectGroup>
              <SelectItem value={'ALL'}>All</SelectItem>
              <SelectItem value={'VALID'}>Valid</SelectItem>
              <SelectItem value={'USED'}>Used</SelectItem>
              <SelectItem value={'EXPIRED'}>Expired</SelectItem>
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

export default BonusHistory;
