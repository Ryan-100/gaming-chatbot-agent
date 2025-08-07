'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Flex, Box, Text } from '@radix-ui/themes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Card, CardContent } from '../../../ui/card';
import { DatePicker } from '../../../ui/date-picker';
import MonthPicker from '../../../ui/month-picker';
import Loading from '../../../ui/loading';
import { categoryColumnDefs, networkColumnDefs } from './components/ColumnDefs';
import PropsTable from '../../../shared/PropsTable';
import { DataTable } from '../../../shared/data-table';
import { CurrencyFormat } from '../../../../utils/currencyFormat';
import { useGetReportCryptoQuery } from '../../../../stores/reducers/report-crypto.reducer';
import { cn } from '../../../../utils/cn';

const CryptoReport = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');
  const time = searchParams.get('time');
  const [selectedType, setSelectedType] = React.useState(type ?? 'DAILY');
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 200,
    type: selectedType,
    time: time ?? dayjs().format('YYYY-MM-DD'),
  });
  const { data, isLoading } = useGetReportCryptoQuery(query);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      type: value,
      time:
        value === 'DAILY'
          ? dayjs().format('YYYY-MM-DD')
          : value === 'MONTHLY'
          ? dayjs().format('YYYY-MM')
          : dayjs().format('YYYY'),
    }));
  };

  const handleDateChange = (value: Date | undefined) => {
    setQuery({
      type: selectedType,
      time: dayjs(value).format('YYYY-MM-DD'),
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
    });
  };

  const handleMonthChange = (value: Date | null) => {
    setQuery({
      type: selectedType,
      time:
        selectedType === 'MONTHLY'
          ? dayjs(value).format('YYYY-MM')
          : dayjs(value).format('YYYY'),
      pageIndex: 1,
      rowPerPage: query.rowPerPage,
    });
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('type', query.type);
    params.set('time', query.time);

    router.push(`/crypto-report?${params.toString()}`);
  }, [query, searchParams, router]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(data?.body?.data?.categoryReport);

  return (
    <Flex direction={'column'} className="my-4 gap-y-4">
      <Flex gap="2" className="flex-col sm:flex-row w-full">
        <Box className="text-xs font-medium">
          <Select
            value={selectedType}
            onValueChange={(value) => handleTypeChange(value)}
          >
            <SelectTrigger className="w-full sm:w-[120px] bg-primary text-text-invert">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-background w-full sm:w-[120px]">
              <SelectGroup>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Box>

        {selectedType === 'DAILY' ? (
          <DatePicker
            date={new Date(query.time)}
            setDate={handleDateChange}
            dateFormat="MMM D, YYYY"
            className="w-full bg-background"
            label="Select Date"
          />
        ) : (
          <MonthPicker
            enableMonth={selectedType === 'MONTHLY' ? true : false}
            date={new Date(query.time)}
            onChange={handleMonthChange}
            className="w-full bg-background"
          />
        )}
      </Flex>

      <Card className="min-w-[470px]">
        <CardContent className="pt-4">
          <Box className="bg-surface-brandLight p-4 text-center rounded-lg">
            <Text className="font-semibold text-sm text-center">
              Total Deposit/Withdraw
            </Text>
          </Box>
          <PropsTable
            rows={[
              {
                key: 'Total Deposit Amount',
                value: (
                  <p className="text-sm font-semibold">
                    TXN Counts / Amount (USDT)
                  </p>
                ),
              },
              {
                key: 'Deposit',
                value: (
                  <p>
                    {data?.body?.data?.totalDepositCount}/{' '}
                    {CurrencyFormat(data?.body?.data?.totalDepositUsdt ?? 0)}
                  </p>
                ),
              },
              {
                key: 'Withdraw',
                value: (
                  <p>
                    {data?.body?.data?.totalWithdrawalCount}/{' '}
                    {CurrencyFormat(data?.body?.data?.totalWithdrawalUsdt ?? 0)}
                  </p>
                ),
              },
              {
                key: 'Difference',
                value: (
                  <p
                    className={cn(
                      'text-sm font-bold',
                      data?.body?.data?.difference! > 0
                        ? 'text-text-success'
                        : 'text-text-error'
                    )}
                  >
                    {CurrencyFormat(
                      data?.body?.data?.difference! > 0
                        ? data?.body?.data?.difference
                        : data?.body?.data?.difference! * -1
                    )}
                  </p>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card className="min-w-[470px]">
        <CardContent className="pt-4">
          <Box className="bg-surface-brandLight p-4 text-center rounded-lg">
            <Text className="font-semibold text-sm text-center">
              Payment Category Report
            </Text>
          </Box>

          <DataTable
            columns={categoryColumnDefs}
            data={data?.body?.data?.categoryReport ?? []}
          />
        </CardContent>
      </Card>

      <Card className="min-w-[470px]">
        <CardContent className="pt-4">
          <Box className="bg-surface-brandLight p-4 text-center rounded-lg">
            <Text className="font-semibold text-sm text-center">
              Crypto Network Report
            </Text>
          </Box>

          <DataTable
            columns={networkColumnDefs}
            data={data?.body?.data?.networkReport ?? []}
          />
        </CardContent>
      </Card>
    </Flex>
  );
};

export default CryptoReport;
