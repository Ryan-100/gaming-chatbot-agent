'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Flex } from '@radix-ui/themes';
import Loading from '../../../../../ui/loading';
import { DataTable } from '../../../../../shared/data-table';
import { columnDefs } from './components/ColumnDefs';
import { useGetSameIpUsersByPlayerQuery } from '../../../../../../stores/reducers/same-ip-users.reducer';

const WithdrawAcceptedSameIpUsers = () => {
  const params = useParams<{ playerId: string }>();

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    id: params.playerId,
  });

  const { data, isLoading } = useGetSameIpUsersByPlayerQuery(query);

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      id: query.id,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gapY="16px">
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
        isShowNo
      />
    </Flex>
  );
};

export default WithdrawAcceptedSameIpUsers;
