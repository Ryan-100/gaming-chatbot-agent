'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { Flex, Box, Text } from '@radix-ui/themes';
import { Card, CardContent } from '../../../ui/card';
import Loading from '../../../ui/loading';
import MonthPicker from '../../../ui/month-picker';
import { columnDefs, cryptoAdminColumnDefs } from './components/ColumnDefs';
import { DataTable } from '../../../shared/data-table';
import { useGetReportDepositAdminQuery } from '../../../../stores/reducers/report-deposit-admin.reducer';

const DepositAdminReport = () => {
  const [query, setQuery] = React.useState({
    time: dayjs().format('YYYY-MM'),
    pageIndex: 1,
    rowPerPage: 200,
  });
  const { data, isLoading } = useGetReportDepositAdminQuery(query);

  const handleMonthChange = (value: Date | null) => {
    setQuery({
      time: dayjs(value).format('YYYY-MM'),
      pageIndex: query.pageIndex,
      rowPerPage: query.rowPerPage,
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flex direction={'column'} className="space-y-4">
      <Box className="w-[129px]">
        <MonthPicker
          enableMonth={true}
          date={new Date(query.time)}
          onChange={handleMonthChange}
          className="w-[129px] bg-background"
        />
      </Box>
      <Card className="min-w-[250px]">
        <CardContent>
          <Box className="bg-surface-brandLight p-4 text-center mt-4 rounded-lg">
            <Text className="font-semibold text-sm text-center">
              Deposit Admin Report (Fiat)
            </Text>
          </Box>
          <DataTable
            columns={columnDefs}
            data={data?.body?.data?.fiatAdminList ?? []}
          />
        </CardContent>
      </Card>
      <Card className="min-w-[250px]">
        <CardContent>
          <Box className="bg-surface-brandLight p-4 text-center mt-4 rounded-lg">
            <Text className="font-semibold text-sm text-center">
              Deposit Admin Report (Crypto)
            </Text>
          </Box>
          <DataTable
            columns={cryptoAdminColumnDefs}
            data={data?.body?.data?.cryptoAdminList ?? []}
          />
        </CardContent>
      </Card>
    </Flex>
  );
};

export default DepositAdminReport;
