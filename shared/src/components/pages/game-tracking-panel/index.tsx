'use client';
import React, { useState } from 'react';
import { DataTable } from '../../shared/data-table';
import { Flex, Box } from '@radix-ui/themes';
import { columnDefs } from './components/ColumnDefs';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Icons } from '../../ui/icons';
import Loading from '../../ui/loading';
import CreateGamePanelModal from './components/CreateGamePanelModal';
import CreateButton from '../../shared/buttons/CreateButton';
import { useGetTrackPanelQuery } from '../../../stores/reducers/track-panel.reducer';

const GameTrackingPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [search, setSearch] = React.useState('');

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    search: '',
  });
  const { data, isLoading } = useGetTrackPanelQuery(query);

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

  const handleCreate = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} gapY={'12px'} className=" px-4">
      <Flex justify={'between'} align={'center'} className="flex-wrap gap-4">
        <Flex
          gap="4"
          className="w-full md:w-1/2 max-w-[488px] flex-wrap sm:flex-nowrap"
          align={'center'}
        >
          <Input
            placeholder="Search by main game"
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
            className="w-full sm:w-fit"
          >
            Search
          </Button>
        </Flex>
        <CreateButton className="w-full sm:w-fit" onClick={handleCreate} />
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
        <CreateGamePanelModal open={modalOpen} handleClose={handleModalClose} />
      )}
    </Flex>
  );
};

export default GameTrackingPanel;
