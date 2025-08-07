'use client';
import React from 'react';
import dayjs from '../../../../../../utils/dayjs';
import { useParams, useSearchParams } from 'next/navigation';
import { Box, Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { Card, CardContent } from '../../../../../ui/card';
import Loading from '../../../../../ui/loading';
import { useGetWithdrawAccountQuery } from '../../../../../../stores/reducers/report-crypto.reducer';

const WithdrawAccounts = () => {
  const searchParams = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const type = searchParams.get('type');
  const time = searchParams.get('time');
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    id: id ?? '',
    time: time ?? '',
    type: type ?? '',
  });

  const handlePageChange = (page: number) => {
    setQuery({
      id: query.id,
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      time: query.time,
      type: query.type,
    });
  };

  const { data, isLoading } = useGetWithdrawAccountQuery(query);

  if (isLoading) {
    <Loading />;
  }

  return (
    <Flex direction="column" gapY="12px" className="">
      <Card>
        <CardContent className="pt-4">
          <Box className="bg-surface-brandLight p-4 text-center">
            <Text className="font-semibold text-sm text-center">
              {dayjs(time ?? '').format(
                type === 'DAILY'
                  ? 'DD MMM YYYY'
                  : type === 'MONTHLY'
                  ? 'MMM YYYY'
                  : 'YYYY'
              )}
            </Text>
          </Box>
          <DataTable
            data={data?.body?.data ?? []}
            columns={columnDefs}
            query={{
              pageIndex: query.pageIndex,
              rowPerPage: query.rowPerPage,
              total: data?.body?.total ?? 0,
              pageCount: data?.body?.pageCount ?? 0,
            }}
            onChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Flex>
  );
};

export default WithdrawAccounts;
