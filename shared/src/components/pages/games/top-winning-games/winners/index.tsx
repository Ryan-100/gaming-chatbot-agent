'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Flex, Box } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import { DataTable } from '../../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { Icons } from '../../../../ui/icons';
import Loading from '../../../../ui/loading';
import { useGetTopWinnersQuery } from '../../../../../stores/reducers/top-winning-games.reducer';

const Winners = () => {
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = React.useState('');

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    search: '',
    child_game_id: parseInt(id),
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      search: query.search,
      child_game_id: query.child_game_id,
    });
  };

  const handleSearch = (search: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      child_game_id: query.child_game_id,
      search: search,
    });
  };

  const { data, isLoading } = useGetTopWinnersQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} gapY={'12px'}>
      <Flex
        gap="4"
        className="sm:w-1/3 min-w-[240px] flex-wrap sm:flex-nowrap"
        align={'center'}
      >
        <Input
          placeholder="Search by game name"
          className="bg-background"
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
        />
      </Box>
    </Flex>
  );
};

export default Winners;
