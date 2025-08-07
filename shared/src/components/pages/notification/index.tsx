'use client';
import React from 'react';
import dayjs from '../../../utils/dayjs';
import { useRouter } from 'next/navigation';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../shared/data-table';
import { columnDefs } from './components/ColumnDef';
import { DatePicker } from '../../ui/date-picker';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';
import Loading from '../../ui/loading';
import { useGetNotificationQuery } from '../../../stores/reducers/notification.reducer';
import CreateButton from '../../shared/buttons/CreateButton';

const NotificationHistory = () => {
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    showPinned: 'FALSE',
    date: dayjs().format('YYYY-MM-DD'),
    notificationType: 'ALL',
  });
  const router = useRouter();

  const { data, isLoading } = useGetNotificationQuery(query);

  const handleShowPinChange = (isPinned: boolean) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      showPinned: String(isPinned).toUpperCase(),
    }));
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      date: selectedDate
        ? dayjs(selectedDate).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
    }));
  };

  const handlePageChange = (page: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageIndex: page,
    }));
  };

  const handleCreateClick = () => {
    router.push(`/notification/create`);
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log('data', data?.body?.data);

  return (
    <Flex direction="column" gapY="12px" className="">
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        <Text className="text-lg font-bold">Notifications</Text>
        <CreateButton onClick={handleCreateClick} />
      </Flex>
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        <DatePicker
          date={new Date(query.date)}
          setDate={handleDateChange}
          dateFormat="MMM/D/YYYY"
          className="bg-background w-[159px] max-w-[159px]"
        />
        <Flex align="center" className="space-x-2 mr-4">
          <Checkbox
            id="pin"
            className="text-text-invert border border-secondary"
            onCheckedChange={handleShowPinChange}
          />
          <Label htmlFor="pin" className="font-medium text-sm">
            View Only Pinned Notification
          </Label>
        </Flex>
      </Flex>
      <Box>
        {data?.body && (
          <DataTable
            data={data?.body?.data}
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
    </Flex>
  );
};

export default NotificationHistory;
