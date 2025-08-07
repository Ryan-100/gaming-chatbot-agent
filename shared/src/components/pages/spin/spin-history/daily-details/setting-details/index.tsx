"use client";
import React from 'react';
import Loading from '../../../../../ui/loading';
import { useSearchParams } from 'next/navigation';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useGetSpinHistorySettingQuery } from '../../../../../../stores/reducers/spin-history.reducer';
import { DataTable } from '../../../../../shared/data-table';
import { columnDef } from './components/ColumnDef';
import PropsTable from '../../../../../shared/PropsTable';
import { Icons } from '../../../../../ui/icons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const SettingDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || "";
  const router = useRouter();
  const { data, isLoading, isError, error: spinHistoryError } = useGetSpinHistorySettingQuery({ id });

  if (!id) {
    router.push(`/spin-history`);
  }

  if (isLoading) {
    return <div className='w-[100vw] h-[100vh]'>
      <Loading />
    </div>
  }

  if (isError) {
    const error: any = spinHistoryError;
    toast.error(error?.data?.meta?.message)
  }

  return (
    <Box className="space-y-4">
      <Flex
        className="bg-white rounded-sm w-[70px] h-[40px] mr-2 cursor-pointer"
        justify="center"
        align="center"
        gap="2"
        onClick={() => router.back()}
      >
        <Icons.BackArrow />
        <Text className="text-sm text-text-primary">Back</Text>
      </Flex>
      <PropsTable
        rows={[
          {
            key: 'Winning Chance',
            value: data?.body?.data?.SpinSetting?.winChance || "_",
          },
          {
            key: 'Spin Bonus Expire After',
            value: `${data?.body?.data?.SpinSetting?.bonusExpireDate} - ${data?.body?.data?.SpinSetting?.bonusExpireType}` || "_",
          },
        ]}
      />
      <Box>
        {data?.body && (
          <DataTable
            data={data?.body?.data?.spinItems}
            columns={columnDef}
          />
        )}

      </Box>
    </Box>
  )
}

export default SettingDetails