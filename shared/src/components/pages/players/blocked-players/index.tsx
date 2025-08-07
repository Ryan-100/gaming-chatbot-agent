'use client';
import React from 'react';
import io from 'socket.io-client';
import { Box, Flex } from '@radix-ui/themes';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';
import Loading from '../../../ui/loading';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetPlayerQuery } from '../../../../stores/reducers/player.reducer';
import { API_URL } from '../../../../lib/api';

const socket = io(API_URL, { transports: ['websocket'] });

const BlockedPlayers = () => {
  const [search, setSearch] = React.useState('');

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
    status: 'BLOCKED',
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      word: query.word,
      status: query.status,
    });
  };

  const handleSearch = (search: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      word: search,
      status: query.status,
    });
  };

  const { data, isLoading } = useGetPlayerQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="12px">
      <Flex
        gap="8px"
        align="center"
        className="sm:w-1/3 min-w-[240px] flex-wrap sm:flex-nowrap"
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
          loading={isLoading}
        >
          Search
        </Button>
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

export default BlockedPlayers;
