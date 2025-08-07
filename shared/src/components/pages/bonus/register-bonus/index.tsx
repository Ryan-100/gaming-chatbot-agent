'use client';
import React, { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/columnDefs';
import { CreateRegisterBonusDialog } from './components/CreateRegisterBonusDialog';
import {
  useGetActiveRegisterBonusListQuery,
  useGetExpireRegisterBonusListQuery,
} from '../../../../stores/reducers/bonus.reducer';
import { toast } from 'sonner';
import Loading from '../../../ui/loading';
import MonthPicker from '../../../ui/month-picker';
import dayjs from '../../../../utils/dayjs';
import { PAGINATION } from '../../../../data/constants';
import CreateButton from '../../../shared/buttons/CreateButton';
import { expiredColumnDefs } from './components/expiredColumnDefs';

const DATE_FORMAT = 'YYYY-MM';

const RegisterBonus = () => {
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
  } = useGetActiveRegisterBonusListQuery();
  const {
    data: expireBonusData,
    isLoading: fetchingExpireBonus,
    isError: isExpireError,
    error: expireBonusError,
  } = useGetExpireRegisterBonusListQuery(query);

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

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDate(date);
      setQuery((prev) => ({
        ...prev,
        date: dayjs(date).format(DATE_FORMAT),
      }));
    }
  };

  return (
    <Flex direction="column" gapY="16px" className="">
      <Box className="w-full !flex flex-col items-end justify-start md:flex-row md:justify-between md:items-center gap-x-4 gap-y-2 ">
        <Text className="text-base text-start w-full">
          Currently Active Register Bonus
        </Text>
        <CreateButton onClick={handleCreateClick} />
      </Box>
      <Box>
        <Box>
          {activeBonusData?.body?.data && (
            <DataTable
              data={activeBonusData?.body?.data}
              columns={columnDefs}
            />
          )}
        </Box>
      </Box>
      <Box className="w-full !flex flex-col items-end justify-start md:flex-row md:justify-between md:items-center gap-x-4 gap-y-2 ">
        <Text className="text-base w-full text-start">
          Expired Register Bonus History
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
      <CreateRegisterBonusDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Flex>
  );
};

export default RegisterBonus;
