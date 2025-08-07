'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
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
import { columnDefs } from './components/ColumnDefs';
import PropsTable from '../../../shared/PropsTable';
import { DataTable } from '../../../shared/data-table';
import { CurrencyFormat } from '../../../../utils/currencyFormat';
import { useGetReportPaymentQuery } from '../../../../stores/reducers/report-payment.reducer';

const PaymentReport = () => {
  const [selectedType, setSelectedType] = React.useState('DAILY');
  const [query, setQuery] = React.useState({
    type: selectedType,
    time: dayjs().format('YYYY-MM-DD'),
    pageIndex: 1,
    rowPerPage: 200,
  });
  const { data, isLoading } = useGetReportPaymentQuery(query);

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
      pageIndex: query.pageIndex,
      rowPerPage: query.rowPerPage,
    }));
  };

  const handleDateChange = (value: Date | undefined) => {
    setQuery({
      type: selectedType,
      time: dayjs(value).format('YYYY-MM-DD'),
      pageIndex: query.pageIndex,
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
      pageIndex: query.pageIndex,
      rowPerPage: query.rowPerPage,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} className="my-4 gap-y-4">
      <Flex gap="2" className="flex-col sm:flex-row w-full">
        <Box className="text-[12px] font-medium">
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

      <Card>
        <CardContent className="pt-4">
          <PropsTable
            rows={[
              {
                key: 'Total Deposit Amount',
                value: CurrencyFormat(
                  data?.body?.data?.totalDepositAmount ?? 0
                ),
              },
              {
                key: 'Total Withdraw Amount',
                value: CurrencyFormat(
                  data?.body?.data?.totalWithdrawalAmount ?? 0
                ),
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <Box className="bg-surface-brandLight p-4 text-center rounded-lg">
            <Text className="font-semibold text-sm text-center">
              Deposit Receiving Accounts List
            </Text>
          </Box>

          <DataTable
            columns={columnDefs}
            data={data?.body?.data?.accountList ?? []}
            isShowNo
          />
        </CardContent>
      </Card>
    </Flex>
  );
};

export default PaymentReport;
