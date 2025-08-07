'use client';
import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetUpcomingPMQuery } from '../../../../stores/reducers/pocket-money.reducer';
import Loading from '../../../ui/loading';
import { toast } from 'sonner';

const PocketMoney = () => {
  const { data, isLoading, isError, error: apiError } = useGetUpcomingPMQuery();

  if (isLoading) {
    return <div className='w-[100vw] h-[100vh]'>
      <Loading />
    </div>
  }

  if (isError) {
    const error: any = apiError;
    toast.error(error?.data?.meta?.message)
  }

  return (
    <Flex direction="column" gapY="12px" className="">
      <Box>
        {data?.body?.data && (
          <Box>
            <DataTable 
              data={data.body.data} 
              columns={columnDefs} 
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default PocketMoney;
