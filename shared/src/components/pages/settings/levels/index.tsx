'use client';
import React from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { Button } from '../../../ui/button';
import { Icons } from '../../../ui/icons';
import { columnDefs } from './components/ColumnDefs';
import { LevelsFormDialog } from './components/LevelsFormDialog';
import { useGetPlayerLevelsQuery } from '../../../../stores/reducers/player-level.reducer';
import Loading from '../../../ui/loading';
import { toast } from 'sonner';

const Levels = () => {
  const [isCreate, setIsCreate] = React.useState(false);

  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useGetPlayerLevelsQuery();

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
    <Box className="space-y-4">
      <Flex justify="end" align="center">
        <Button
          className="flex items-center justify-center space-x-2"
          onClick={() => {
            setIsCreate(true);
          }}
        >
          <Icons.Plus className="w-4 h-4" />
          <Text className="text-xs">Create</Text>
        </Button>
      </Flex>

      {data?.body && (
        <Box>
          <DataTable data={data?.body?.data} columns={columnDefs} />
        </Box>
      )}

      {isCreate && (
        <LevelsFormDialog
          open={isCreate}
          onClose={() => setIsCreate(false)}
          title="Create Level"
          yesLabel="Create"
          noLabel="Cancel"
        />
      )}
    </Box>
  );
};

export default Levels;
