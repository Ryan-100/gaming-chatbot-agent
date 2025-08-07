'use client';
import React, { useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Icons } from '../../../ui/icons';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetTransactionRegisterBonusQuery } from '../../../../stores/reducers/transaction-register-bonus.reducer';
import Loading from '../../../ui/loading';

const RegisterBonus = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      word: query.word,
    });
  };

  const handleSearch = (search: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      word: search,
    });
  };

  const { data, isLoading } = useGetTransactionRegisterBonusQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="12px" className="">
      <Flex justify="between">
        <Flex
          gapX="8px"
          align="center"
          className="md:w-1/3 min-w-[240px] flex-wrap md:flex-nowrap"
        >
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

export default RegisterBonus;
