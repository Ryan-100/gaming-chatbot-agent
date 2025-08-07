'use client';
import React from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../../../shared/data-table';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import Loading from '../../../../../ui/loading';
import { columnDefs } from './components/ColumnDefs';
import { ContactFormDialog } from './components/ContactFormDialog';
import { useGetSettingContactQuery } from '../../../../../../stores/reducers/settings-contact.reducer';

const PhoneEmail = () => {
  const [isCreate, setIsCreate] = React.useState(false);
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
  });

  const handlePageChange = (page: number) => {
    setQuery({ pageIndex: page, rowPerPage: query.rowPerPage });
  };

  const { data, isLoading } = useGetSettingContactQuery(query);

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
          <Icons.Plus className="w-5 h-5 text-text-primary" />
          <Text className="text-xs text-text-primary font-medium">
            New Phone/Email
          </Text>
        </Button>
      </Flex>
      <Box>
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
      </Box>
      <ContactFormDialog
        open={isCreate}
        onClose={() => setIsCreate(false)}
        title="Create New Phone/ Email"
        yesLabel="Create"
        noLabel="Cancel"
      />
    </Box>
  );
};

export default PhoneEmail;
