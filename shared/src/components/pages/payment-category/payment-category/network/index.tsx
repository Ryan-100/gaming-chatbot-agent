'use client'
import React, { useState } from 'react'
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../../shared/data-table';
import { useGetCryptoNetworkQuery } from '../../../../../stores/reducers/crypto-network.reducer';
import { columnDefs } from './components/ColumnDefs';
import CryptoNetworkFormDialog from './components/CryptoNetworkFormDialog';
import Loading from '../../../../ui/loading';
import { toast } from 'sonner';
import CreateButton from '../../../../shared/buttons/CreateButton';


const Network = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError, error: apiError } = useGetCryptoNetworkQuery();

  const handleCreateClick = () => {
    setModalOpen(true);
  };

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

      <CryptoNetworkFormDialog
        title="Network"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        yesLabel="Create"
      />
    </Flex>
  )
}

export default Network;