'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Card } from '../../../ui/card';
import { Icons } from '../../../ui/icons';
import { Label } from '../../../ui/label';
// import { DatePicker } from '../../../ui/date-picker';
import Loading from '../../../ui/loading';
import { DataTable } from '../../../shared/data-table';
import { columnDefs, cryptoAdminColumnDefs } from './components/ColumnDefs';
import { CurrencyFormat } from '../../../../utils/currencyFormat';
import { useGetDepositAutoTopUpQuery } from '../../../../stores/reducers/deposit-auto-top-up.reducer';
import { useGetDepositDashboardDetailTableQuery } from '../../../../stores/reducers/deposit-dashboard.reducer';

const DepositAutoTopup = () => {
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    date: dayjs().format('YYYY-MM-DD'),
  });

  const { data: DetailTableData, isLoading: isDetailTableFetching } =
    useGetDepositDashboardDetailTableQuery({}); //to check crypto admin
  const { data, isLoading } = useGetDepositAutoTopUpQuery(query);

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      date: query.date,
    });
  };

  // const handleDateChange = (selectedDate: Date | undefined) => {
  //   setQuery({
  //     pageIndex: 1,
  //     rowPerPage: query.rowPerPage,
  //     date: selectedDate
  //       ? dayjs(selectedDate).format('YYYY-MM-DD')
  //       : dayjs().format('YYYY-MM-DD'),
  //   });
  // };

  if (isLoading || isDetailTableFetching) {
    return <Loading />;
  }

  return (
    <Box className="space-y-4">
      <Card className="flex flex-col gap-y-6 p-4 min-w-[100px]">
        <Flex className="border border-border-secondary divide-x divide-y divide-border-secondary rounded-lg flex-wrap min-w-[100px]">
          <Flex align="center" className="flex-1 p-4 gap-2">
            <Label htmlFor="calendar" className="relative max-w-14 max-h-14">
              <Flex
                align="center"
                justify="center"
                className="p-4 bg-primary rounded-lg"
              >
                <Icons.Calendar className="w-6 h-6 text-text-invert" />
              </Flex>
              {/* <DatePicker
                date={new Date(query.date)}
                setDate={handleDateChange}
                dateFormat={'DD, MMM, YYYY'}
                className="opacity-0 absolute inset-0"
              /> */}
            </Label>
            <Flex direction="column" className="gap-2">
              <Text className="text-sm lg:text-base">Date</Text>
              <Text className="font-medium text-sm lg:text-base">
                {dayjs(query.date).format('D MMM YYYY')}
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" className="flex-1 p-4 gap-2">
            <Flex
              align="center"
              justify="center"
              className="p-4 bg-primary rounded-lg"
            >
              <Icons.Deposit className="w-6 h-6 text-text-invert" />
            </Flex>
            <Flex direction="column" className="gap-2">
              <Text className="text-sm lg:text-base">Total Deposit</Text>
              <Text className="font-medium text-sm lg:text-base">
                {CurrencyFormat(data?.body?.data?.totalAmount ?? 0)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <DataTable
        data={data?.body?.data?.recordHistory ?? []}
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
    </Box>
  );
};

export default DepositAutoTopup;
