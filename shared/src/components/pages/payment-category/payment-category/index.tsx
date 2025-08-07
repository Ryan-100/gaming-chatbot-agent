'use client';
import React, { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';
import { columnDefs } from './components/ColumnDefs';
import { useGetPaymentCategoryQuery } from '../../../../stores/reducers/payment-category.reducer';
import Link from 'next/link';
import Loading from '../../../ui/loading';
import CreatePaymentCategoryFormDialog from './components/CreatePaymentCategoryFormDialog';
import Image from 'next/image';
import CreateButton from '../../../shared/buttons/CreateButton';
import { toast } from 'sonner';

const PaymentCategory = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
  });
  const [modalOpen, setModalOpen] = React.useState(false);

  const {
    data,
    isLoading,
    isError,
    error: paymentError,
  } = useGetPaymentCategoryQuery(query);

  const handleCreateClick = () => {
    setModalOpen(true);
  };

  const handleInputChange = () => {
    setQuery({
      word: search,
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
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
    const error: any = paymentError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Flex direction="column" gapY="16px" className="">
      <Flex
        justify="between"
        align="center"
        className="flex-wrap lg:flex-nowrap gap-2"
      >
        <Flex className="gap-2 lg:w-1/2 flex-wrap sm:flex-nowrap">
          <Input
            placeholder="Search by Payment Type"
            className="bg-background min-w-[180px] w-full"
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

        <Flex className="gap-2 flex-wrap">
          <Link
            href={`/payment-category/type`}
            className="flex-1 bg-background h-[42px] px-3 lg:px-4 flex justify-center items-center gap-x-2 rounded-[4px]"
          >
            <Image
              src={'/upload/icons/payment-category/type.svg'}
              width={12}
              height={12}
              alt="type icon"
            />
            <Text className="text-sm"> Type </Text>
          </Link>

          <Link
            href={`/payment-category/network`}
            className="flex-1 bg-background h-[42px] px-3 lg:px-4 flex justify-center items-center gap-x-2 rounded-[4px]"
          >
            <Image
              src={'/upload/icons/payment-category/network.svg'}
              width={16}
              height={16}
              alt="network icon"
            />
            <Text className="text-sm"> Network </Text>
          </Link>

          <CreateButton onClick={handleCreateClick} className="flex-1" />
        </Flex>
      </Flex>
      {data?.body && (
        <Box>
          <DataTable
            data={data.body.data}
            columns={columnDefs}
            query={{
              pageIndex: query.pageIndex,
              rowPerPage: query.rowPerPage,
              total: data?.body?.total ?? 0,
              pageCount: data?.body?.pageCount ?? 0,
            }}
            onChange={handlePageChange}
          />
        </Box>
      )}

      {modalOpen && (
        <CreatePaymentCategoryFormDialog
          title="Type"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Flex>
  );
};

export default PaymentCategory;
