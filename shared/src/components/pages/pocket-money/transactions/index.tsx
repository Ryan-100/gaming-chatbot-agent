'use client';
import React, { useState } from 'react';
import { Text, Flex, Box } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { Card } from '../../../ui/card';
import { columnDefs } from './components/ColumnDefs';
import { useGetPMTransactionsQuery } from '../../../../stores/reducers/pocket-money.reducer';
import Loading from '../../../ui/loading';
import { toast } from 'sonner';

const PocketMoneyTransaction = ({ id }: { id: string }) => {
  const [query, setQuery] = useState({
    id,
    rowPerPage: 15,
    pageIndex: 1,
  });

  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useGetPMTransactionsQuery(query);

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loading />
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  };

  if (isError) {
    const error: any = apiError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Flex direction="column" gapY="12px" className="">
      <Card>
        <Box className="px-4 pt-4">
          <Text className="font-semibold text-sm">New Year Pocket Money</Text>
        </Box>

        <Box>
          {data?.body?.data && (
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
        </Box>
      </Card>
    </Flex>
  );
};

export default PocketMoneyTransaction;
