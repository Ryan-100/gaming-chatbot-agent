'use client';
import React from 'react';
import { Flex, Box } from '@radix-ui/themes';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import Loading from '../../../ui/loading';
import { Icons } from '../../../ui/icons';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetHotGameQuery } from '../../../../stores/reducers/hot-games.reducer';
import CreateButton from '../../../shared/buttons/CreateButton';
import CreateHotGameDialog from './components/CreateHotGameDialog';

const PopularGames = () => {
  const [search, setSearch] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);

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

  const { data, isLoading } = useGetHotGameQuery(query);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flex direction={'column'} className="space-y-4">
      <Flex justify={'between'} align={'center'} className="flex-wrap gap-4">
        <Flex
          gap="4"
          className="flex-wrap lg:w-1/2 sm:flex-nowrap"
          align={'center'}
        >
          <Input
            placeholder="Search by game"
            className="bg-background min-w-[200px]"
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

        <CreateButton name="Add Hot Game" onClick={() => setModalOpen(true)} />
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
      {modalOpen && (
        <CreateHotGameDialog
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
        />
      )}
    </Flex>
  );
};

export default PopularGames;
