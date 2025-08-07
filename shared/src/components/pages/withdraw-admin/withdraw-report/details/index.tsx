'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Text } from '@radix-ui/themes';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';
import { Form, FormControl, FormField, FormItem } from '../../../../ui/form';
import Loading from '../../../../ui/loading';
import { DataTable } from '../../../../shared/data-table';
import { getColumnDefs } from './components/ColumnDefs';
import { useGetWithdrawReportDetailQuery } from '../../../../../stores/reducers/withdraw-report-reducer';
import { useGetWithdrawDashboardQuery } from '../../../../../stores/reducers/withdraw-dashboard.reducer';

const filterValidationSchema = z.object({
  amountSearch: z.string(),
});
type DepositFilterForm = z.infer<typeof filterValidationSchema>;

const WithdrawReportDetail = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const time = searchParams.get('time');
  const requestType = searchParams.get('requestType');

  const form = useForm<DepositFilterForm>({
    resolver: zodResolver(filterValidationSchema),
  });

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    type: type ?? '',
    time: dayjs(time).format('YYYY-MM-DD'),
    requestType: requestType ?? '',
    amountSearch: '',
  });
  const { data: DashboardData, isLoading: DashboardDataFetching } =
    useGetWithdrawDashboardQuery({});
  const { data, isLoading } = useGetWithdrawReportDetailQuery(query);

  const handlePageChange = (page: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageIndex: page,
    }));
  };

  const filterFormSubmit = async (data: DepositFilterForm) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
      type: query.type,
      time: query.time,
      requestType: query.requestType,
      amountSearch: data.amountSearch,
    });
  };

  if (isLoading || DashboardDataFetching) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} className="gap-4">
      <Text className="font-bold text-center">
        {dayjs(time ?? '').format('DD MMM YYYY')}
      </Text>
      <Form {...form}>
        <form
          className="flex items-center gap-2 flex-wrap w-full lg:w-1/2"
          onSubmit={form.handleSubmit(filterFormSubmit)}
        >
          <Flex align="center" className="gap-2 flex-wrap">
            <FormField
              control={form.control}
              name="amountSearch"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter Amount"
                      className="w-40 bg-background"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Flex>
          <Button type="submit">Search</Button>
        </form>
      </Form>
      <DataTable
        data={data?.body?.data ?? []}
        columns={getColumnDefs(
          DashboardData?.body?.data?.withdrawDashboard?.WithdrawAccountHolder[0]
            ?.PaymentAccount?.PaymentCategory?.PaymentType?.isCrypto
            ? true
            : false,
          requestType === 'REJECTED'
        )}
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

export default WithdrawReportDetail;
