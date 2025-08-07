"use client";
import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../../shared/data-table';
import { useGetPaymentTypesQuery } from '../../../../../stores/reducers/payment-type.reducer';
import { columnDefs } from './components/ColumnDefs';
import { PaymentTypeFormDialog } from './components/PaymentTypeFormDialog';
import Loading from '../../../../ui/loading';
import { toast } from 'sonner';
import CreateButton from '../../../../shared/buttons/CreateButton';

const PaymentType = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const { data, isLoading, isError, error: paymentError } = useGetPaymentTypesQuery();

  const handleCreateClick = () => {
    setModalOpen(true);
  };

  if (isLoading) {
    return <div className='w-[100vw] h-[100vh]'>
      <Loading />
    </div>
  }

  if (isError) {
    const error: any = paymentError;
    toast.error(error?.data?.meta?.message)
  }

  return (
    <Flex direction="column" gapY="16px" className="">
      <Flex justify="end" align="center">
        <CreateButton
          onClick={handleCreateClick}
        />
      </Flex>

      {data?.body && (
        <Box>
          <DataTable data={data.body.data} columns={columnDefs} />
        </Box>
      )}

      {
        modalOpen && (
          <PaymentTypeFormDialog
            title="Type"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            yesLabel="Create"
          />
        )
      }
    </Flex>
  )
}

export default PaymentType