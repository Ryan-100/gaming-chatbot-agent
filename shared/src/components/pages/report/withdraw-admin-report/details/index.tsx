'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useParams, useSearchParams } from 'next/navigation';
import { Flex, Box, Text, Grid } from '@radix-ui/themes';
import { Card, CardContent } from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import Loading from '../../../../ui/loading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { Input } from '../../../../ui/input';
import { DatePicker } from '../../../../ui/date-picker';
import { columnDefs, cryptoAdminColumnDefs } from './components/columnDef';
import { DataTable } from '../../../../shared/data-table';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { useGetReportWithdrawAdminDetailQuery } from '../../../../../stores/reducers/report-withdraw-admin.reducer';

const statusOptions = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Accepted',
    value: 'ACCEPTED',
  },
  {
    label: 'Rejected',
    value: 'REJECTED',
  },
  {
    label: 'Pre Accepted',
    value: 'PREACCEPTED',
  },
];

const WithdrawAdminDetails = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const isCrypto = type === 'CRYPTO';

  const [searchInput, setSearchInput] = React.useState('');

  const [selectedValue, setSelectedValue] = React.useState('ALL');

  const [query, setQuery] = React.useState({
    id,
    pageIndex: 1,
    rowPerPage: 20,
    time: dayjs().format('YYYY-MM-DD'),
    amount: searchInput,
    status: selectedValue,
  });

  const { data, isLoading } = useGetReportWithdrawAdminDetailQuery(query);
  const DetailData = data?.body?.data;

  const handlePageChange = (page: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageIndex: page,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toString());
  };

  const handleSearchClick = () => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      amount: searchInput,
      pageIndex: 1, // Reset to the first pageIndex when searching
    }));
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: value,
      pageIndex: 1, // Reset to the first page when filtering
    }));
  };

  const handleDateChange = (value: Date | undefined) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      time: dayjs(value).format('YYYY-MM-DD'),
      pageIndex: 1, // Reset to the first page when filtering
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className="space-y-4">
      <Card className="min-w-[400px]">
        <CardContent className="p-4">
          <Box className="border-b border-b-surface-secondary py-4">
            <Grid columns="5" align="center" justify="center">
              <Text className="text-sm"></Text>
              <Text className="text-sm font-semibold">Pending</Text>
              <Text className="text-sm font-semibold">Accepted</Text>
              <Text className="text-sm font-semibold">Rejected</Text>
              <Text className="text-sm font-semibold">Total</Text>
            </Grid>
          </Box>
          <Box className="border-b border-b-surface-secondary py-4">
            <Grid columns="5" align="center" justify="center">
              <Text className="text-sm font-semibold">Count</Text>
              <Text className="text-sm">
                {DetailData?.adminData?.pendingDataList[0]?.pendingCount}
              </Text>
              <Text className="text-sm">
                {DetailData?.adminData?.acceptedDataList[0]?.acceptedCount}
              </Text>
              <Text className="text-sm">
                {DetailData?.adminData?.rejectedDataList[0]?.rejectedCount}
              </Text>
              <Text className="text-sm">
                {DetailData?.adminData?.totalDataList[0]?.totalCount}
              </Text>
            </Grid>
          </Box>
          <Box className="border-b border-b-surface-secondary py-4">
            <Grid columns="5" align="center" justify="center">
              <Text className="text-sm font-semibold">
                Amount&nbsp;{isCrypto ? '(USDT)' : ''}
              </Text>
              <Text className="text-sm">
                {CurrencyFormat(
                  isCrypto
                    ? DetailData?.adminData?.pendingDataList[0]?.pendingUsdt
                    : DetailData?.adminData?.pendingDataList[0]?.pendingAmount
                )}
              </Text>
              <Text className="text-sm">
                {CurrencyFormat(
                  isCrypto
                    ? DetailData?.adminData?.acceptedDataList[0]?.acceptedUsdt
                    : DetailData?.adminData?.acceptedDataList[0]?.acceptedAmount
                )}
              </Text>
              <Text className="text-sm">
                {CurrencyFormat(
                  isCrypto
                    ? DetailData?.adminData?.rejectedDataList[0]?.rejectedUsdt
                    : DetailData?.adminData?.rejectedDataList[0]?.rejectedAmount
                )}
              </Text>
              <Text className="text-sm">
                {CurrencyFormat(
                  isCrypto
                    ? DetailData?.adminData?.totalDataList[0]?.totalUsdt
                    : DetailData?.adminData?.totalDataList[0]?.totalAmount
                )}
              </Text>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Flex
        justify={'between'}
        direction={{
          initial: 'column',
          sm: 'row',
        }}
        className="justify-between gap-2"
      >
        <Flex gap="2" className="flex-1 flex-col sm:flex-row">
          <DatePicker
            date={new Date(query.time)}
            setDate={handleDateChange}
            dateFormat="MMM D, YYYY"
            className="w-full sm:w-[149px] bg-background"
            label="Select Date"
          />
          <Select value={selectedValue} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full sm:w-[149px] bg-background">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="w-full sm:w-[149px] bg-background">
              <SelectGroup>
                {statusOptions.map((item, index) => (
                  <SelectItem value={item.value} key={index}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Flex>
        <Flex className="flex-1">
          <Input
            placeholder="Search by amount"
            className=" bg-white w-full rounded-r-none border-r-0"
            value={searchInput}
            type="number"
            onChange={handleSearchChange}
            preFix={<Icons.Search />}
          />
          <Button
            className="flex items-center space-x-2 text-sm rounded-l-none"
            onClick={handleSearchClick}
            loading={!!searchInput && isLoading}
          >
            Search
          </Button>
        </Flex>
      </Flex>

      <Card className="min-w-[250px]">
        <CardContent className="p-0">
          <DataTable
            columns={isCrypto ? cryptoAdminColumnDefs : columnDefs}
            data={DetailData?.transactionList ?? []}
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
    </Box>
  );
};

export default WithdrawAdminDetails;
