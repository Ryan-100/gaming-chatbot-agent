'use client';
import React from 'react';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { Card, CardContent } from '../../../ui/card';
import MonthPicker from '../../../ui/month-picker';
import PropsTable from '../../../shared/PropsTable';
import { cn, CurrencyFormat } from '../../../../utils';
import { useGetYearlyReportsQuery } from '../../../../stores/reducers/report-interval.reducer';
import Loading from '../../../ui/loading';
import dayjs from '../../../../utils/dayjs';
import { toast } from 'sonner';
import { resultColumnDef } from './components/columnDef';
import { winOrLose } from '../../../../utils/winOrLose';

const backendDateFormat = 'YYYY-MM';

const YearlyReport = () => {
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    rowPerPage: 200,
    date: dayjs().format(backendDateFormat),
  });

  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useGetYearlyReportsQuery(query);
  const transData =
    data?.body?.data?.gameTransaction && data?.body?.data?.gameTransaction;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const error: any = apiError;
    toast.error(error?.data?.meta?.message);
  }

  const handleDateChange = (date: Date | null) => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: 1,
      date: date
        ? dayjs(date).format(backendDateFormat)
        : dayjs().format(backendDateFormat),
    }));
  };

  return (
    <Box className="space-y-4">
      <Flex align={'center'} className="w-[129px] max-w-[129px]">
        <MonthPicker
          onChange={handleDateChange}
          date={new Date(query.date)}
          className="w-[129px] max-w-[129px]"
        />
      </Flex>

      <Card className="min-w-[250px]">
        <CardContent className="pt-4">
          <PropsTable
            rows={[
              {
                key: 'New User',
                value: data?.body?.data?.newUserCount ?? 0,
              },
              {
                key: 'Deposit for new user',
                value: CurrencyFormat(data?.body?.data?.newUserDeposit || 0),
              },
              {
                key: 'Withdraw for new user',
                value: CurrencyFormat(data?.body?.data?.newUserWithdraw || 0),
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card className="min-w-[250px]">
        <CardContent className="pt-4">
          <Box className="bg-surface-brandLight p-4 text-center rounded-lg">
            <Text className="font-semibold text-sm text-center">Games</Text>
          </Box>
          <Box className="border-b border-b-surface-secondary py-4">
            <Grid columns="3" align="center" justify="center">
              <Text className="text-sm"></Text>
              <Text className="text-sm font-semibold">Player</Text>
              <Text className="text-sm font-semibold">Bet Amount</Text>
            </Grid>
          </Box>
          <Box className="border-b border-b-surface-secondary py-4">
            <Grid columns="3" align="center" justify="center">
              <Text className="text-sm font-semibold"> Go In </Text>
              <Text className="text-sm">{transData?.players?.in || 0}</Text>
              <Text className="text-sm">
                {CurrencyFormat(transData?.amount?.in || 0)}
              </Text>
            </Grid>
          </Box>
          <Box className="border-b border-b-surface-secondary py-4">
            <Grid columns="3" align="center" justify="center">
              <Text className="text-sm font-semibold"> Go Out </Text>
              <Text className="text-sm">{transData?.players?.out || 0}</Text>
              <Text className="text-sm">
                {CurrencyFormat(transData?.amount?.out || 0)}
              </Text>
            </Grid>
          </Box>
          <Box className="border-b border-b-surface-secondary py-4">
            <Grid columns="3" align="center" justify="center">
              <Text className="text-sm font-semibold"> Net Win/Lose </Text>
              <Text className="text-sm"> </Text>
              <Text
                className={cn(
                  'text-sm',
                  winOrLose(transData?.amount?.difference ?? 0)
                )}
              >
                {CurrencyFormat(
                  transData?.amount?.difference! > 0
                    ? transData?.amount?.difference
                    : transData?.amount?.difference! * -1
                )}
              </Text>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Card className="min-w-[250px]">
        <CardContent className="p-2">
          <DataTable
            columns={resultColumnDef}
            data={data?.body?.data?.games ?? []}
          />
        </CardContent>
      </Card>

      <Card className="min-w-[250px]">
        <CardContent className="pt-4">
          <Box className="bg-surface-brandLight p-4 text-center">
            <Text className="font-semibold text-sm text-center">
              Total Deposit/withdraw
            </Text>
          </Box>
          <PropsTable
            rows={[
              {
                key: 'Deposit',
                value: `${data?.body?.data?.totalDepositCount}/${data?.body?.data?.totalDepositAmount}`,
              },
              {
                key: 'Withdraw',
                value: `${data?.body?.data?.totalWithdrawCount}/${data?.body?.data?.totalWithdrawAmount}`,
              },
              {
                key: 'Difference',
                value: (
                  <p>
                    {data?.body?.data?.differentCount}/
                    <span
                      className={winOrLose(
                        data?.body?.data?.differentAmount ?? 0
                      )}
                    >
                      {data?.body?.data?.differentAmount}
                    </span>
                  </p>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default YearlyReport;
