'use client';
import React from 'react';
import { Flex, Box } from '@radix-ui/themes';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import Loading from '../../../ui/loading';
import { statusOptions } from './components/mock';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/columDef';
import { useGetMainGameQuery } from '../../../../stores/reducers/main-games.reducer';

const MainGames = () => {
  const [search, setSearch] = React.useState('');

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    search: '',
    status: 'all',
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      search: query.search,
      status: query.status,
    });
  };

  const handleSearch = (search: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      search: search,
      status: query.status,
    });
  };

  const handleStatusChange = (value: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      search: query.search,
      status: value,
    });
  };

  const { data, isLoading } = useGetMainGameQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} gapY={'12px'} className="px-4">
      <Flex justify={'between'} align={'center'} className="flex-wrap gap-4">
        <Flex
          gap="4"
          className="flex-wrap lg:w-1/2 sm:flex-nowrap"
          align={'center'}
        >
          <Input
            placeholder="Search by main game"
            className="bg-background min-w-[200px]"
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
          <Select
            defaultValue={'all'}
            value={query.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[159px] bg-primary text-text-invert">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {statusOptions.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                    className=" bg-white"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Box>
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

export default MainGames;
