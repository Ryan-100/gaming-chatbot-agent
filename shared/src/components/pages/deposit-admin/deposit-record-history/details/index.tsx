'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Text } from '@radix-ui/themes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';
import { Form, FormControl, FormField, FormItem } from '../../../../ui/form';
import Loading from '../../../../ui/loading';
import { DataTable } from '../../../../shared/data-table';
import { columnDefs, cryptoAdminColumnDefs } from './components/ColumnDefs';
import { useGetDepositRecordHistoryDetailQuery } from '../../../../../stores/reducers/deposit-record.reducer';
import { useGetDepositDashboardDetailTableQuery } from '../../../../../stores/reducers/deposit-dashboard.reducer';

const filterValidationSchema = z.object({
  inputValue: z.string(),
  type: z.string(),
});
type DepositFilterForm = z.infer<typeof filterValidationSchema>;

const DepositRecordHistoryDetail = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const time = searchParams.get('time');
  const requestType = searchParams.get('requestType');

  console.log(time, 'time');

  const form = useForm<DepositFilterForm>({
    resolver: zodResolver(filterValidationSchema),
    defaultValues: {
      type: 'amountSearch',
    },
  });

  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
    type: type ?? '',
    time: dayjs(time).format(type === 'MONTHLY' ? 'YYYY-MM-DD' : 'YYYY-MM'),
    requestType: requestType ?? '',
  });
  const { data: DetailTableData, isLoading: isDetailTableFetching } =
    useGetDepositDashboardDetailTableQuery({});
  const { data, isLoading } = useGetDepositRecordHistoryDetailQuery(query);

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
      [data.type]: data.inputValue,
    });
  };

  if (isLoading || isDetailTableFetching) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} className="gap-4">
      <Text className="font-bold text-center">
        {dayjs(time ?? '').format(
          type === 'MONTHLY' ? 'DD MMM YYYY' : 'MMM YYYY'
        )}
      </Text>
      <Form {...form}>
        <form
          className="flex items-center gap-2 flex-wrap w-full lg:w-1/2"
          onSubmit={form.handleSubmit(filterFormSubmit)}
        >
          <Flex align="center" className="gap-2 flex-wrap">
            {!DetailTableData?.body?.data?.paymentProvider?.PaymentType
              ?.isCrypto && (
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex-1 bg-background max-w-40">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue="amountSearch"
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectGroup>
                            <SelectItem value={'digitSearch'}>Digit</SelectItem>
                            <SelectItem value={'amountSearch'}>
                              Amount
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="inputValue"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      type={
                        form.getValues('type') === 'amount' ? 'number' : 'text'
                      }
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
        columns={
          DetailTableData?.body?.data?.paymentProvider?.PaymentType?.isCrypto
            ? cryptoAdminColumnDefs
            : columnDefs
        }
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

export default DepositRecordHistoryDetail;
