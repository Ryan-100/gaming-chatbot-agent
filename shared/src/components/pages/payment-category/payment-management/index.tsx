'use client';
import React, { useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';
import { columnDefs } from './components/ColumnDefs';
import { useGetPaymentManagementsQuery } from '../../../../stores/reducers/payment-management.reducer';
import CreatePaymentManagementFormDialog from './components/CreatePaymentManagementFormDialog';
import Loading from '../../../ui/loading';
import { PAGINATION } from '../../../../data/constants';
import { toast } from 'sonner';
import CreateButton from '../../../shared/buttons/CreateButton';

const PaymentManagement = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState({
    pageIndex: PAGINATION.defaultPage,
    rowPerPage: PAGINATION.rowPerPage,
    word: '',
  });
  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useGetPaymentManagementsQuery(query);

  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateClick = () => {
    setModalOpen(true);
  };

  const handleInputChange = () => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      word: search,
    });
  };

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      word: query.word,
    });
  };

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    const error: any = apiError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Flex direction="column" gapY="16px" className="">
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        <Flex className="gap-2 lg:w-1/2 flex-wrap sm:flex-nowrap">
          <Input
            placeholder="Search by account type, name and number"
            className="bg-background min-w-[200px]"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            preFix={<Icons.Search />}
          />
          <Button
            className="flex items-center space-x-2 text-sm w-full sm:w-fit"
            onClick={handleInputChange}
          >
            Search
          </Button>
        </Flex>

        <CreateButton onClick={handleCreateClick} className="w-full sm:w-fit" />
      </Flex>
      <Box>
        {data?.body && (
          <DataTable
            data={data?.body.data}
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
        <CreatePaymentManagementFormDialog
          title="Payment Account"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          yesLabel="Create"
        />
      )}
    </Flex>
  );
};

export default PaymentManagement;
