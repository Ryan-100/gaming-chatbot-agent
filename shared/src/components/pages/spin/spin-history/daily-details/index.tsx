'use client';
import { Box, Flex } from '@radix-ui/themes';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from '../../../../shared/PageBreadCrumb';
import { useSearchParams } from 'next/navigation';
import dayjs from '../../../../../utils/dayjs';
import { useRouter } from 'next/navigation';
import { DataTable } from '../../../../shared/data-table';
import { useGetDailySpinHistoryListQuery } from '../../../../../stores/reducers/spin-history.reducer';
import { useState } from 'react';
import { columnDef } from './components/ColumnDef';
import Loading from '../../../../ui/loading';
import { toast } from 'sonner';

const SpinHistoryDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultDate = searchParams.get('date');
  const [query, setQuery] = useState({
    date: defaultDate || '',
    pageIndex: 1,
    rowPerPage: 20,
  });

  const {
    data,
    isLoading,
    isError,
    error: spinHistoryError,
  } = useGetDailySpinHistoryListQuery(query);

  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Spin', href: '' },
    { label: 'Spin History', href: '/spin-history' },
    {
      label: `${dayjs(defaultDate).format('MMM DD, YYYY')}`,
      href: '',
    },
  ];

  if (!defaultDate) {
    router.push(`/spin-history`);
  }

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    const error: any = spinHistoryError;
    toast.error(error?.data?.meta?.message);
  }

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  };

  return (
    <Box>
      <Flex justify="between" align={'center'}>
        <PageBreadcrumb links={breadCrumbs} enableBack />
      </Flex>

      <Box className="w-full">
        {data?.body && (
          <DataTable
            data={data?.body?.data}
            columns={columnDef}
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
    </Box>
  );
};
export default SpinHistoryDetail;
