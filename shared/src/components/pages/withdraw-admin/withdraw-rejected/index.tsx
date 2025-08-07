'use client';
import React from 'react';
import { Flex } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { columnDefs, cryptoAdminColumnDefs } from './components/ColumnDefs';
import Loading from '../../../ui/loading';
import { useGetTransactionsWithdrawQuery } from '../../../../stores/reducers/transactions-withdraw.reducer';
import { useGetWithdrawDashboardQuery } from '../../../../stores/reducers/withdraw-dashboard.reducer';

const WithdrawRejected = () => {
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    status: 'REJECTED',
    date: '',
  });

  const { data: DashboardData, isLoading: DashboardDataFetching } =
    useGetWithdrawDashboardQuery({});
  const { data, isLoading } = useGetTransactionsWithdrawQuery(query);

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      status: query.status,
      date: query.date,
    });
  };

  if (isLoading || DashboardDataFetching) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="16px">
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

export default WithdrawRejected;
