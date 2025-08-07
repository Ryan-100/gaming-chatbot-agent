'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useParams, useSearchParams } from 'next/navigation';
import { Flex, Text } from '@radix-ui/themes';
import Loading from '../../../../ui/loading';
import { DataTable } from '../../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetReportCryptoByCategoryQuery } from '../../../../../stores/reducers/report-crypto.reducer';

const DepositRecordHistoryDetail = () => {
  const searchParams = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const type = searchParams.get('type');
  const time = searchParams.get('time');

  const [query, setQuery] = React.useState({
    id,
    type: type ?? '',
    time: time ?? '',
  });

  const { data, isLoading } = useGetReportCryptoByCategoryQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} className="gap-4">
      <Text className="text-sm lg:text-base font-medium">
        Deposit ({' '}
        {dayjs(time).format(
          type === 'DAILY'
            ? 'DD MMM YYYY'
            : type === 'MONTHLY'
            ? 'MMM YYYY'
            : 'YYYY'
        )}
        )
      </Text>

      <DataTable
        data={data?.body?.data?.depositReport ?? []}
        columns={columnDefs}
        query={{
          pageIndex: 1,
          rowPerPage: data?.body?.data?.withdrawalReport?.length ?? 0,
          total: data?.body?.data?.withdrawalReport?.length ?? 0,
          pageCount: 1,
        }}
        isShowNo
      />
      <Text className="text-sm lg:text-base font-medium">
        Withdraw ({' '}
        {dayjs(time ?? '').format(
          type === 'DAILY'
            ? 'DD MMM YYYY'
            : type === 'MONTHLY'
            ? 'MMM YYYY'
            : 'YYYY'
        )}
        )
      </Text>

      <DataTable
        data={data?.body?.data?.withdrawalReport ?? []}
        columns={columnDefs}
        query={{
          pageIndex: 1,
          rowPerPage: data?.body?.data?.withdrawalReport?.length ?? 0,
          total: data?.body?.data?.withdrawalReport?.length ?? 0,
          pageCount: 1,
        }}
        isShowNo
      />
    </Flex>
  );
};

export default DepositRecordHistoryDetail;
