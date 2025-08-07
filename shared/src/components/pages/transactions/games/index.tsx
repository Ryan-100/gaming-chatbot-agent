'use client';
import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Icons } from '../../../ui/icons';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetTransactionGameQuery } from '../../../../stores/reducers/transaction-games.reducer';
import Loading from '../../../ui/loading';

const Game = () => {
  const [search, setSearch] = React.useState('');
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    search: '',
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      search: query.search,
    });
  };

  const handleSearch = (search: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      search: search,
    });
  };

  const { data, isLoading } = useGetTransactionGameQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="12px" className="">
      <Flex justify="between">
        <Flex
          gap="8px"
          className="md:w-1/3 min-w-[240px] flex-wrap md:flex-nowrap"
        >
          <Input
            className="bg-background"
            placeholder="Search by player"
            preFix={<Icons.Search />}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
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

export default Game;
