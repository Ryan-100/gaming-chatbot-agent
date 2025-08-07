'use client';
import React, { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { activeDepositColumnDefs } from './components/ActiveDepositColumnDefs';
import { activeRegisterColumnDefs } from './components/ActiveRegisterColumnDefs';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { DatePicker } from '../../../ui/date-picker';
import { useGetActiveBonusListQuery } from '../../../../stores/reducers/bonus.reducer';
import Loading from '../../../ui/loading';
import dayjs from '../../../../utils/dayjs';

import { toast } from 'sonner';

const DATE_FORMAT = 'YYYY-MM-DD';

const ActiveBonus = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState({
    search: '',
    date: '',
  });

  const {
    data,
    isLoading,
    isError,
    error: activeBonusError,
  } = useGetActiveBonusListQuery(query);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setQuery((prev) => ({
        ...prev,
        date: dayjs(date).format(DATE_FORMAT),
      }));
    }
  };

  const handleSearch = () => {
    setQuery((prev) => ({
      ...prev,
      search: search,
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full h-100vh">
        <Loading />
      </div>
    );
  }

  if (isError) {
    const error: any = activeBonusError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Flex direction="column" gapY="16px" className="">
      <Box className="w-full !flex flex-col items-end justify-start md:flex-row md:justify-between md:items-center gap-x-4 gap-y-2 ">
        <Box className="!flex flex-row gap-2 w-full md:w-2/4">
          <Box className=" w-full !flex flex-row gap-x-2">
            <Input
              placeholder="Search"
              className="bg-background w-full"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Button className="text-sm block" onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </Box>

        <DatePicker
          className="bg-background w-fit"
          setDate={handleDateChange}
          dateFormat={DATE_FORMAT}
          date={date}
        />
      </Box>

      <Text className="text-base">Currently Active Deposit Bonus</Text>
      <Box>
        {data?.body?.data?.activeDeposit && (
          <DataTable
            data={data?.body?.data?.activeDeposit}
            columns={activeDepositColumnDefs}
          />
        )}
      </Box>

      <Text className="text-base">Currently Active Register Bonus</Text>
      <Box>
        {data?.body?.data?.activeRegister && (
          <DataTable
            data={data?.body?.data?.activeRegister}
            columns={activeRegisterColumnDefs}
          />
        )}
      </Box>
      <Text className="text-base">Currently Active First Deposit Bonus</Text>
      <Box>
        {data?.body?.data?.activeFirstDeposit && (
          <DataTable
            data={data?.body?.data?.activeFirstDeposit}
            columns={activeDepositColumnDefs}
          />
        )}
      </Box>
    </Flex>
  );
};

export default ActiveBonus;
