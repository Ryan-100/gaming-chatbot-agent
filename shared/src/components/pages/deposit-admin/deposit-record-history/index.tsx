'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { Box, Flex } from '@radix-ui/themes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import MonthPicker from '../../../ui/month-picker';
import Loading from '../../../ui/loading';
import { DataTable } from '../../../shared/data-table';
import { columnDefs, cryptoAdminColumnDefs } from './components/ColumnDefs';
import { useGetDepositRecordHistoryQuery } from '../../../../stores/reducers/deposit-record.reducer';
import { useGetDepositDashboardDetailTableQuery } from '../../../../stores/reducers/deposit-dashboard.reducer';

const DepositRecordHistory = () => {
  const [selectedType, setSelectedType] = React.useState('MONTHLY');
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    type: selectedType,
    time: dayjs().format('YYYY-MM'),
  });

  const { data: DetailTableData, isLoading: isDetailTableFetching } =
    useGetDepositDashboardDetailTableQuery({});

  const { data, isLoading } = useGetDepositRecordHistoryQuery(query);

  const handlePageChange = (page: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageIndex: page,
    }));
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      type: value,
      time:
        value === 'MONTHLY'
          ? dayjs().format('YYYY-MM')
          : dayjs().format('YYYY'),
    }));
  };

  const handleDateChange = (value: Date | null) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      type: selectedType,
      time:
        selectedType === 'MONTHLY'
          ? dayjs(value).format('YYYY-MM')
          : dayjs(value).format('YYYY'),
    });
  };

  if (isLoading || isDetailTableFetching) {
    return <Loading />;
  }

  console.log(query.time, 'time');

  return (
    <Flex direction="column" gapY="16px">
      <Flex
        justify="start"
        className="flex-col sm:flex-row gap-4 sm:items-center relative w-1/2"
      >
        <Select
          value={selectedType}
          onValueChange={(value) => handleTypeChange(value)}
        >
          <SelectTrigger className="w-[129px] max-w-[129px] bg-background">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="w-[129px] max-w-[129px] bg-background">
            <SelectGroup>
              <SelectItem value={'MONTHLY'}>Monthly</SelectItem>
              <SelectItem value={'YEARLY'}>Yearly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Box className="w-[129px] max-w-[129px]">
          <MonthPicker
            enableMonth={selectedType === 'MONTHLY' ? true : false}
            date={new Date(query.time)}
            onChange={handleDateChange}
            className="w-[129px] max-w-[129px] bg-background"
          />
        </Box>
      </Flex>
      <DataTable
        data={data?.body?.data ?? []}
        columns={
          DetailTableData?.body?.data?.paymentProvider?.PaymentType?.isCrypto
            ? cryptoAdminColumnDefs
            : columnDefs
        }
        query={{
          pageIndex: query.pageIndex,
          rowPerPage: query.rowPerPage,
          total: data?.body?.total ?? 0,
          pageCount: data?.body?.pageCount ?? 0,
        }}
        onChange={handlePageChange}
        isShowNo
      />
    </Flex>
  );
};

export default DepositRecordHistory;
