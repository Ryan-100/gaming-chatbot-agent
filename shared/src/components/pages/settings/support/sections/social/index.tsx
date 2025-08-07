'use client';
import React from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../../../shared/data-table';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import Loading from '../../../../../ui/loading';
import { columnDefs } from './components/ColumnDefs';
import { CreateSocialFormDialog } from './components/CreateSocialFormDialog';
import { useGetSettingSocialMediaQuery } from '../../../../../../stores/reducers/settings-social-media.reducer';

const SocialPlatforms = () => {
  const [isCreate, setIsCreate] = React.useState(false);
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
  });

  const handlePageChange = (page: number) => {
    setQuery({ pageIndex: page, rowPerPage: query.rowPerPage });
  };

  const { data, isLoading } = useGetSettingSocialMediaQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className="space-y-4">
      <Flex justify="start" align="center">
        <Button
          className="flex items-center justify-center space-x-2 bg-background"
          onClick={() => {
            setIsCreate(true);
          }}
        >
          <Icons.Plus className="w-4 h-4 text-text-primary" />
          <Text className="text-xs text-text-primary">New Social Link</Text>
        </Button>
      </Flex>
      <Box>
        {data?.body?.data && (
          <DataTable
            data={data?.body?.data ?? []}
            columns={columnDefs}
            query={{
              pageIndex: query.pageIndex,
              rowPerPage: query.rowPerPage,
              total: 20,
              pageCount: 1,
            }}
            onChange={handlePageChange}
          />
        )}
      </Box>
      {isCreate && (
        <CreateSocialFormDialog
          open={isCreate}
          onClose={() => setIsCreate(false)}
        />
      )}
    </Box>
  );
};

export default SocialPlatforms;
