'use client';
import React, { useCallback } from 'react';
import dayjs from '../../../../utils/dayjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import { Card } from '../../../ui/card';
import { Icons } from '../../../ui/icons';
import { Image } from '../../../ui/image';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Form, FormControl, FormField, FormItem } from '../../../ui/form';
import Loading from '../../../ui/loading';
import { CurrencyFormat } from '../../../../../src/utils';
import { DataTable } from '../../../shared/data-table';
import { columnDefs, cryptoAdminColumnDefs } from './components/ColumnDefs';
import {
  useCreateDepositDashboardDigitMutation,
  useGetDepositDashboardDetailTableQuery,
  useGetDepositDashboardRequestsQuery,
} from '../../../../stores/reducers/deposit-dashboard.reducer';
import { useGetDepositRateQuery } from '../../../../stores/reducers/exchange-rate.reducer';

const requestValidationSchema = z.object({
  amount: z.string().max(8),
  digit: z.string({ message: 'Maximum 8 digits' }).max(8),
});

const filterValidationSchema = z.object({
  inputValue: z.string(),
  type: z.string(),
});

type DepositRequestForm = z.infer<typeof requestValidationSchema>;
type DepositFilterForm = z.infer<typeof filterValidationSchema>;

const DepositDashboard = () => {
  const form_1 = useForm<DepositRequestForm>({
    resolver: zodResolver(requestValidationSchema),
  });
  const form_2 = useForm<DepositFilterForm>({
    resolver: zodResolver(filterValidationSchema),
    defaultValues: {
      type: 'amount',
    },
  });
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 20,
  });
  const { data: DetailTableData, isLoading: isDetailTableFetching } =
    useGetDepositDashboardDetailTableQuery({});
  const {
    data: DashboardRequestsData,
    isLoading: isDashboardRequestsFetching,
  } = useGetDepositDashboardRequestsQuery(query);

  const { data: depositResponse, isLoading: depositLoading } =
    useGetDepositRateQuery({
      date: dayjs().format('YYYY-MM-DD'),
    });

  const [createDashboardDigits, { isLoading: isFormSubmitting }] =
    useCreateDepositDashboardDigitMutation();

  const currentDepositRate = depositResponse?.body?.data.latestExchangeRate;

  const handlePageChange = (page: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageIndex: page,
    }));
  };

  const setAmount = useCallback(
    (amount: string) => {
      form_1.setValue('amount', amount);
    },
    [form_1]
  );

  const formOneClearing = useCallback(() => {
    form_1.reset({
      amount: '',
      digit: '',
    });
  }, [form_1]);

  const requestFormSubmit = async (data: DepositRequestForm) => {
    try {
      const response = await createDashboardDigits({
        digit: data?.digit,
        amount: parseInt(data?.amount),
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        formOneClearing();
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterFormSubmit = async (data: DepositFilterForm) => {
    setQuery({
      pageIndex: 1,
      rowPerPage: 20,
      [data.type]: data.inputValue,
    });
  };

  const amounts = [
    1000, 2000, 3000, 5000, 10000, 15000, 20000, 30000, 50000, 100000, 150000,
    200000,
  ];

  if (isDetailTableFetching || isDashboardRequestsFetching || depositLoading) {
    return <Loading />;
  }

  return (
    <Box className="space-y-4">
      <Card className="flex flex-col gap-y-6 p-4">
        {DetailTableData?.body?.data && (
          <Flex className="border border-border-secondary divide-x divide-y divide-border-secondary rounded-lg flex-wrap">
            <Flex align="center" className="flex-1 p-4 gap-2 min-w-[150px]">
              <Image
                src={
                  DetailTableData?.body?.data?.paymentProvider?.File?.url ?? ''
                }
                alt="Type"
                width={56}
                height={56}
                className="rounded-lg"
              />
              <Flex direction="column" className="gap-2">
                <Text className="text-sm lg:text-base">Wallet Type</Text>
                <Text className="font-medium text-sm lg:text-base">
                  {DetailTableData?.body?.data?.paymentProvider?.accountType ??
                    ''}
                </Text>
              </Flex>
            </Flex>
            <Flex align="center" className="flex-1 p-4 gap-2 min-w-[150px]">
              <Flex
                align="center"
                justify="center"
                className="p-4 bg-primary rounded-lg"
              >
                <Icons.Deposit className="w-6 h-6 text-text-invert" />
              </Flex>
              <Flex direction="column" className="gap-2">
                <Text className="text-sm lg:text-base">Total Entry</Text>
                <Text className="font-medium text-sm lg:text-base">
                  {DetailTableData?.body?.data?.totalRequest ?? 0}
                </Text>
              </Flex>
            </Flex>
            <Flex align="center" className="flex-1 p-4 gap-2 min-w-[150px]">
              <Flex
                align="center"
                justify="center"
                className="p-4 bg-primary rounded-lg"
              >
                <Icons.Dollar className="w-6 h-6 text-text-invert" />
              </Flex>
              <Flex direction="column" className="gap-2">
                <Text className="text-sm lg:text-base">Total Amount</Text>
                <Text className="font-medium text-sm lg:text-base">
                  {CurrencyFormat(
                    DetailTableData?.body?.data?.totalAmount ?? 0
                  )}
                </Text>
              </Flex>
            </Flex>
            {DetailTableData?.body?.data?.paymentProvider?.PaymentType
              ?.isCrypto && (
              <Flex align="center" className="flex-1 p-4 gap-2 min-w-[150px]">
                <Flex
                  align="center"
                  justify="center"
                  className="p-4 bg-primary rounded-lg"
                >
                  <Icons.Dollar className="w-6 h-6 text-text-invert" />
                </Flex>
                <Flex direction="column" className="gap-2">
                  <Text className="text-sm lg:text-base">
                    Total USDT Amount
                  </Text>
                  <Text className="font-medium text-sm lg:text-base">
                    {CurrencyFormat(
                      DetailTableData?.body?.data?.transferedAmount ?? 0
                    )}
                  </Text>
                </Flex>
              </Flex>
            )}
            {DetailTableData?.body?.data?.paymentProvider?.PaymentType
              ?.isCrypto && (
              <Flex align="center" className="flex-1 p-4 gap-2 min-w-[150px]">
                <Flex
                  align="center"
                  justify="center"
                  className="p-4 bg-primary rounded-lg"
                >
                  <Icons.Dollar className="w-6 h-6 text-text-invert" />
                </Flex>
                <Flex direction="column" className="gap-2">
                  <Text className="text-sm lg:text-base">Exchange Rate</Text>
                  <Text className="font-medium text-sm lg:text-base">
                    1 USDT ={' '}
                    {CurrencyFormat(currentDepositRate?.amountPerUsdt ?? 0)}{' '}
                    {currentDepositRate?.currency ?? ''}
                  </Text>
                </Flex>
              </Flex>
            )}
          </Flex>
        )}
        {!DetailTableData?.body?.data?.paymentProvider?.PaymentType
          ?.isCrypto && (
          <>
            <Form {...form_1}>
              <form
                className="flex gap-4 items-center flex-grow flex-wrap"
                onSubmit={form_1.handleSubmit(requestFormSubmit)}
              >
                <FormField
                  control={form_1.control}
                  name="digit"
                  render={({ field }) => (
                    <FormItem className="flex-1 min-w-[100px]">
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={8}
                          type="number"
                          placeholder="Enter TXN Digit"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form_1.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1 min-w-[100px]">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter Amount"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="flex-1 min-w-[100px]"
                  loading={isFormSubmitting}
                >
                  Confirm
                </Button>
              </form>
            </Form>
            <Grid
              columns={{
                initial: '3',
                md: '5',
                xl: '6',
              }}
              align="center"
              className="gap-2"
            >
              {amounts.map((amount) => (
                <Button
                  key={amount}
                  className="col-span-1"
                  variant="outline"
                  onClick={() => setAmount(amount.toString())}
                >
                  {CurrencyFormat(amount)}
                </Button>
              ))}
              <Button className="col-span-1" onClick={formOneClearing}>
                Clear
              </Button>
            </Grid>
          </>
        )}
      </Card>
      <Card className="p-4 flex flex-col gap-4">
        <Form {...form_2}>
          <form
            className="flex items-center gap-2 flex-wrap w-full lg:w-1/2"
            onSubmit={form_2.handleSubmit(filterFormSubmit)}
          >
            <Flex className="gap-2 flex-col sm:flex-row sm:items-center">
              {!DetailTableData?.body?.data?.paymentProvider?.PaymentType
                ?.isCrypto && (
                <FormField
                  control={form_2.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue="amount"
                          disabled={
                            DetailTableData?.body?.data?.paymentProvider
                              ?.PaymentType?.isCrypto
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value={'amount'}>Amount</SelectItem>
                              <SelectItem value={'digit'}>Digit</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form_2.control}
                name="inputValue"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        type={
                          form_2.getValues('type') === 'amount'
                            ? 'number'
                            : 'text'
                        }
                        placeholder="Enter Amount"
                        className="w-40"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Flex>
            <Button type="submit">Search</Button>
          </form>
        </Form>
        {DashboardRequestsData?.body && (
          <DataTable
            data={DashboardRequestsData?.body?.data ?? []}
            columns={
              DetailTableData?.body?.data?.paymentProvider?.PaymentType
                ?.isCrypto
                ? cryptoAdminColumnDefs
                : columnDefs
            }
            query={{
              pageIndex: query.pageIndex,
              rowPerPage: query.rowPerPage,
              total: DashboardRequestsData?.body?.total ?? 0,
              pageCount: DashboardRequestsData?.body?.pageCount ?? 0,
            }}
            onChange={handlePageChange}
            isShowNo
          />
        )}
      </Card>
    </Box>
  );
};

export default DepositDashboard;
