'use client';
import React, { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/columnDefs';
import { CreateDepositBonusDialog } from './components/CreateDepositBonusDialog';
import {
  useGetActiveDepositBonusListQuery,
  useGetExpireDepositBonusListQuery,
} from '../../../../stores/reducers/bonus.reducer';
import Loading from '../../../ui/loading';
import dayjs from '../../../../utils/dayjs';
import { toast } from 'sonner';
import MonthPicker from '../../../ui/month-picker';
import { PAGINATION } from '../../../../data/constants';
import CreateButton from '../../../shared/buttons/CreateButton';
import { expiredColumnDefs } from './components/expiredColumDefs';

const DATE_FORMAT = 'YYYY-MM';

const DepositBonus = () => {
  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = React.useState(false);

  const [query, setQuery] = useState({
    pageIndex: PAGINATION.defaultPage,
    rowPerPage: PAGINATION.rowPerPage,
    date: '',
  });

  const {
    data: activeBonusData,
    isLoading: fetchingActiveBonus,
    isError: isActiveError,
    error: activeBonusError,
  } = useGetActiveDepositBonusListQuery();
  const {
    data: expireBonusData,
    isLoading: fetchingExpireBonus,
    isError: isExpireError,
    error: expireBonusError,
  } = useGetExpireDepositBonusListQuery(query);

  if (fetchingActiveBonus || fetchingExpireBonus) {
    return (
      <div className="w-full h-100vh">
        <Loading />
      </div>
    );
  }

  if (isActiveError) {
    const error: any = activeBonusError;
    toast.error(error?.data?.meta?.message);
  }

  if (isExpireError) {
    const error: any = expireBonusError;
    toast.error(error?.data?.meta?.message);
  }

  const handleCreateClick = () => {
    setModalOpen(true);
  };

  const handleDateChange = (date: Date | null) => {
    console.log(dayjs(date).format(DATE_FORMAT));
    if (date) {
      setDate(date);
      setQuery((prev) => ({
        ...prev,
        date: dayjs(date).format(DATE_FORMAT),
      }));
    }
  };

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  };

  return (
    <Flex direction="column" gapY="16px" className="w-full">
      <Box className="w-full !flex flex-col items-end justify-start md:flex-row md:justify-between md:items-center gap-x-4 gap-y-2 ">
        <Text className="text-base text-start w-full">
          Currently Active Deposit Bonus
        </Text>
        <CreateButton onClick={handleCreateClick} />
      </Box>
      <Box>
        {activeBonusData?.body?.data && (
          <DataTable data={activeBonusData?.body?.data} columns={columnDefs} />
        )}
      </Box>

      <Box className="w-full !flex flex-col items-end justify-start md:flex-row md:justify-between md:items-center gap-x-4 gap-y-2 ">
        <Text className="text-base w-full text-left">
          Expired Deposit Bonus History
        </Text>

        <Box className="">
          <MonthPicker
            className="bg-background w-[150px]"
            onChange={handleDateChange}
            date={date}
            enableMonth
          />
        </Box>
      </Box>

      <Box>
        {expireBonusData?.body?.data && (
          <DataTable
            data={expireBonusData?.body?.data}
            columns={expiredColumnDefs}
            query={{
              pageIndex: query.pageIndex,
              rowPerPage: query.rowPerPage,
              total: expireBonusData?.body?.total ?? 0,
              pageCount: expireBonusData?.body?.pageCount ?? 0,
            }}
            onChange={handlePageChange}
          />
        )}
      </Box>

      <CreateDepositBonusDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Flex>
  );
};

export default DepositBonus;
