'use client';
import React from 'react';
import Link from 'next/link';
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetActivePMQuery } from '../../../../stores/reducers/pocket-money.reducer';
import Loading from '../../../ui/loading';
import { toast } from 'sonner';
import CreateButton from '../../../shared/buttons/CreateButton';

const PocketMoney = () => {
  const { data, isLoading, isError, error: apiError } = useGetActivePMQuery({});

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const error: any = apiError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Flex direction="column" gapY="12px" className="">
      <Flex justify="end" align="center">
        <Link href="/pocket-money/active-pocket-money/create">
          <CreateButton
            href="/pocket-money/active-pocket-money/create"
            className="flex items-center space-x-2 text-sm"
          />
        </Link>
      </Flex>
      <Box>
        {data?.body?.data && (
          <Box>
            <DataTable data={data.body.data} columns={columnDefs} />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default PocketMoney;
