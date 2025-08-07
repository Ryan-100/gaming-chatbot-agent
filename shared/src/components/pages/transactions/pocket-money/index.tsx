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
import { useGetTransactionPocketMoneyQuery } from '../../../../stores/reducers/transaction-pocket-money.reducer';
import Loading from '../../../ui/loading';

const PocketMoney = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
    filter: 'ALL',
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      word: query.word,
      filter: query.filter,
    });
  };

  const handleSearch = (search: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      word: search,
      filter: query.filter,
    });
  };

  const handleStatus = (filter: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      word: query.word,
      filter: filter,
    });
  };

  const { data, isLoading } = useGetTransactionPocketMoneyQuery(query);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flex direction="column" gapY="12px" className="">
      <Flex
        justify="between"
        className="w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
      >
        <Flex
          align="center"
          className="flex-1 flex-wrap sm:flex-nowrap max-w-[480px] gap-4"
        >
          <Input
            className="bg-background min-w-[200px]"
            placeholder="Search by player name, id & PM title"
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
        <Flex className="">
          <Select
            defaultValue={query.filter}
            onValueChange={(value) => handleStatus(value)}
          >
            <SelectTrigger className="bg-primary text-text-invert w-fit md:w-[220px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="w-fit md:w-[220px] bg-background">
              <SelectGroup className="w-fit md:w-[220px]">
                <SelectItem value="ALL">All Pocket Money</SelectItem>
                <SelectItem value="RANDOM">Selected Level: Random</SelectItem>
                <SelectItem value="FAIR">Selected Level: Fair</SelectItem>
                <SelectItem value="WEIGHT">Selected Level: Weight</SelectItem>
                <SelectItem value="PLAYER">Selected Player</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Flex>
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
          isShowNo
        />
      </Box>
    </Flex>
  );
};

export default PocketMoney;
