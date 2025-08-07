'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { Box, Flex } from '@radix-ui/themes';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';
import Loading from '../../../ui/loading';
import { DatePicker } from '../../../ui/date-picker';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetTopWinningPlayersQuery } from '../../../../stores/reducers/top-winning-players.reducer';

const DATE_FORMAT = 'YYYY-MM-DD';

const TopWinningPlayers = () => {
  const [search, setSearch] = React.useState('');

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    search: '',
    date: dayjs().format('YYYY-MM-DD'),
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      search: query.search,
      date: query.date,
    });
  };

  const handleSearch = (search: string) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      date: query.date,
      search: search,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: 1,
      date: date
        ? dayjs(date).format(DATE_FORMAT)
        : dayjs().format(DATE_FORMAT),
    }));
  };

  const { data, isLoading } = useGetTopWinningPlayersQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="12px">
      <Flex align={'center'} justify={'between'} className="flex-wrap gap-2">
        <DatePicker
          date={new Date(query.date)}
          setDate={handleDateChange}
          dateFormat={DATE_FORMAT}
          className="w-full md:max-w-[149px] bg-background"
        />
        <Flex
          gap="8px"
          align="center"
          className="sm:w-1/3 min-w-[240px] flex-wrap sm:flex-nowrap"
        >
          <Input
            className="bg-background min-w-40"
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
            className="w-full md:w-fit"
            loading={isLoading}
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
        />
      </Box>
    </Flex>
  );
};

export default TopWinningPlayers;
