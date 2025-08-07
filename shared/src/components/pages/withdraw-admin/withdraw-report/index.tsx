'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { Box, Flex } from '@radix-ui/themes';
import MonthPicker from '../../../ui/month-picker';
import Loading from '../../../ui/loading';
import { DataTable } from '../../../shared/data-table';
import { columnDefs, cryptoAdminColumnDefs } from './components/ColumnDefs';
import { useGetWithdrawReportQuery } from '../../../../stores/reducers/withdraw-report-reducer';
import { useGetWithdrawDashboardQuery } from '../../../../stores/reducers/withdraw-dashboard.reducer';

const WithdrawReport = () => {
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    month: dayjs().format('YYYY-MM'),
  });

  const { data: DashboardData, isLoading: DashboardDataFetching } =
    useGetWithdrawDashboardQuery({});
  const { data, isLoading } = useGetWithdrawReportQuery(query);

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      month: query.month,
    });
  };

  const handleDateChange = (value: Date | null) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      month: value ? dayjs(value).format('YYYY-MM') : dayjs().format('YYYY-MM'),
    });
  };

  if (isLoading || DashboardDataFetching) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="16px">
      <Flex align="center" justify="start" className="gap-4 relative w-1/3">
        <Box className="max-w-[129px]">
          <MonthPicker
            enableMonth={true}
            date={new Date(query.month)}
            onChange={handleDateChange}
            className="max-w-[129px] bg-background"
          />
        </Box>
      </Flex>
      <DataTable
        data={data?.body?.data ?? []}
        columns={
          DashboardData?.body?.data?.withdrawDashboard?.WithdrawAccountHolder[0]
            ?.PaymentAccount?.PaymentCategory?.PaymentType?.isCrypto
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

export default WithdrawReport;
