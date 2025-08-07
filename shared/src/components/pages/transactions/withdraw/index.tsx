'use client';
import React, { useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Icons } from '../../../ui/icons';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetTransactionsWithdrawQuery } from '../../../../stores/reducers/transactions-withdraw.reducer';
import Loading from '../../../ui/loading';
import { DatePicker } from '../../../ui/date-picker';
import dayjs from '../../../../utils/dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

const Withdraw = () => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [query, setQuery] = useState({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
    status: 'PENDING',
    date: '',
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      word: query.word,
      status: query.status,
      date: query.date,
    });
  };

  const handleSearch = (search: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      word: search,
      status: query.status,
      date: query.date,
    });
  };

  const handleStatus = (status: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      word: query.word,
      status: status,
      date: '',
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setQuery((prev) => ({
        ...prev,
        date: dayjs(date).format(DATE_FORMAT),
      }));
    }
  };

  const { data, isLoading } = useGetTransactionsWithdrawQuery(query);

  return (
    <Flex direction="column" gapY="12px" className="">
      <Flex justify="between" className="flex-wrap gap-4">
        <Flex
          gap="8px"
          align="center"
          className="md:w-1/2 min-w-[300px] flex-wrap md:flex-nowrap"
        >
          <DatePicker
            className="bg-background"
            setDate={handleDateChange}
            dateFormat={DATE_FORMAT}
            date={date}
          />
          <Input
            className="bg-background"
            placeholder="Search by player"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            preFix={<Icons.Search />}
          />
          <Button
            onClick={() => {
              handleSearch(search);
            }}
          >
            Search
          </Button>
        </Flex>
        <Flex gap="8px">
          <Select onValueChange={(value) => handleStatus(value)}>
            <SelectTrigger className="w-full bg-primary text-text-invert min-w-[120px] max-w-[120px]">
              <SelectValue placeholder="Requested" />
            </SelectTrigger>
            <SelectContent className="min-w-[120px] max-w-[120px]">
              <SelectGroup className="min-w-[120px] max-w-[120px]">
                <SelectItem value="PENDING">Requested</SelectItem>
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Flex>
      </Flex>
      <Box>
        {isLoading ? (
          <Loading />
        ) : (
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
        )}
      </Box>
    </Flex>
  );
};

export default Withdraw;
