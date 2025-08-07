'use client';
import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { Button } from '../../../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';
import { columnDefs } from './components/ColumnDefs';
import { CreateDepositAdminDialog } from './components/CreateDepositAdminDialog';
import { useGetDepositAdminQuery } from '../../../../stores/reducers/deposit-admin.reducer';
import CreateButton from '../../../shared/buttons/CreateButton';

const DepositAdmin = () => {
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
    status: 'ALL',
  });

  const [searchInput, setSearchInput] = React.useState('');

  const [selectedValue, setSelectedValue] = React.useState('ALL');

  const [modalOpen, setModalOpen] = React.useState(false);

  const { data } = useGetDepositAdminQuery(query);

  const handleCreateClick = () => {
    setModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      word: query.word,
      status: query.status,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      word: searchInput,
      pageIndex: 1,
    }));
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: value,
      pageIndex: 1,
    }));
  };

  return (
    <Flex direction="column" gapY="16px" className="">
      <Flex justify="between" align="center" className="flex-wrap gap-2">
        <Flex className="gap-2 lg:w-1/2 flex-wrap sm:flex-nowrap">
          <Input
            placeholder="Search by name"
            className="bg-background min-w-[180px] w-full"
            value={searchInput}
            onChange={handleSearchChange}
            preFix={<Icons.Search />}
          />
          <Button
            className="flex items-center space-x-2 text-sm w-full sm:w-fit"
            onClick={handleSearchClick}
          >
            Search
          </Button>
          <Select value={selectedValue} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full sm:max-w-[129px] bg-primary text-text-invert">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="w-full sm:max-w-[129px]">
              <SelectGroup>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">InActive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Flex>

        <CreateButton onClick={handleCreateClick} />
      </Flex>
      {data?.body && (
        <Box>
          <DataTable
            data={data.body.data}
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
      )}
      <CreateDepositAdminDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Flex>
  );
};

export default DepositAdmin;
