'use client';
import React from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { Tabs, TabsList, TabsTrigger } from '../../../ui/tabs';
import Loading from '../../../ui/loading';
import CreateButton from '../../../shared/buttons/CreateButton';
import { useGetDepositWithdrawAmountQuery } from '../../../../stores/reducers/deposit-withdraw-amount.reducer';
import { CreateAmountDialog } from './components/CreateAmountDialog';

const Support = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [query, setQuery] = React.useState({
    type: 'FIAT',
    pageIndex: 1,
    rowPerPage: 20,
  });

  const handlePageChange = (page: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageIndex: page,
    }));
  };

  const handleTabChange = (type: string) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      type,
    }));
  };

  const { data, isLoading } = useGetDepositWithdrawAmountQuery(query);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box className="space-y-6">
      <Tabs
        value={query.type}
        onValueChange={handleTabChange}
        className="w-full px-4"
      >
        <TabsList className="w-fit sm:w-[312px] scale-75 sm:scale-100 -ml-8 sm:ml-0">
          <TabsTrigger value="FIAT" className="w-full">
            Fiat
          </TabsTrigger>
          <TabsTrigger value="CRYPTO" className="w-full">
            USDT
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Flex justify="between" align="center" className="pt-4 flex-wrap gap-4">
        <Text className="text-base font-bold">Deposit/ withdraw amount</Text>
        <CreateButton onClick={() => setModalOpen(true)} />
      </Flex>
      <Box>
        {data?.body && (
          <DataTable
            data={data?.body?.data}
            columns={columnDefs}
            query={{
              pageIndex: query.pageIndex,
              rowPerPage: query.rowPerPage,
              total: data?.body?.total ?? 0,
              pageCount: data?.body?.pageCount ?? 0,
            }}
            onChange={handlePageChange}
          />
        )}
      </Box>
      {modalOpen && (
        <CreateAmountDialog
          type={query.type}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default Support;
