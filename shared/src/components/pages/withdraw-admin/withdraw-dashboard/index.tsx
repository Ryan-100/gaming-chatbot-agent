'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import { Card } from '../../../ui/card';
import { Icons } from '../../../ui/icons';
import { Image } from '../../../ui/image';
import Loading from '../../../ui/loading';
import { CurrencyFormat } from '../../../../../src/utils';
import { useGetWithdrawDashboardQuery } from '../../../../stores/reducers/withdraw-dashboard.reducer';
import { useGetWithdrawRateQuery } from '../../../../stores/reducers/exchange-rate.reducer';

const WithdrawDashboard = () => {
  const { data, isLoading } = useGetWithdrawDashboardQuery({});
  const { data: withdrawResponse, isLoading: withdrawLoading } =
    useGetWithdrawRateQuery({
      date: dayjs().format('YYYY-MM-DD'),
    });
  const DashboardData = data?.body?.data;

  const currentWithdrawRate = withdrawResponse?.body?.data.latestExchangeRate;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box className="space-y-4">
      <Card className="flex flex-col gap-y-6 p-4">
        <Flex className="border border-border-secondary divide-x divide-y divide-border-secondary rounded-lg flex-wrap">
          <Flex
            align="center"
            className="flex-1 p-4 gap-2 min-w-[150px] flex-wrap"
          >
            <Image
              src={
                DashboardData?.withdrawDashboard?.WithdrawAccountHolder[0]
                  ?.PaymentAccount?.PaymentCategory?.File?.url ?? ''
              }
              alt="Type"
              width={56}
              height={56}
              className="rounded-lg"
            />
            <Flex direction="column" className="gap-2">
              <Text className="text-sm lg:text-base">Wallet Type</Text>
              <Text className="font-medium text-sm lg:text-base">
                {
                  DashboardData?.withdrawDashboard?.WithdrawAccountHolder[0]
                    ?.PaymentAccount?.PaymentCategory?.accountType
                }
              </Text>
            </Flex>
          </Flex>

          <Flex
            align="center"
            className="flex-1 p-4 gap-2 min-w-[150px] flex-wrap"
          >
            <Flex
              align="center"
              justify="center"
              className="p-4 bg-primary rounded-lg"
            >
              <Icons.Dollar className="w-6 h-6 text-text-invert" />
            </Flex>
            <Flex direction="column" className="gap-2">
              <Text className="text-sm lg:text-base">Amount</Text>
              <Text className="font-medium text-sm lg:text-base">
                {CurrencyFormat(
                  DashboardData?.withdrawDashboard?.WithdrawAccountHolder[0]
                    ?.minAmount ?? 0
                )}
                &nbsp;-&nbsp;
                {CurrencyFormat(
                  DashboardData?.withdrawDashboard?.WithdrawAccountHolder[0]
                    ?.maxAmount ?? 0
                )}
              </Text>
            </Flex>
          </Flex>
          {DashboardData?.withdrawDashboard?.WithdrawAccountHolder[0]
            ?.PaymentAccount?.cryptoNetworkId && (
            <Flex
              align="center"
              className="flex-1 p-4 gap-2 min-w-[150px] flex-wrap"
            >
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
                  {CurrencyFormat(currentWithdrawRate?.amountPerUsdt ?? 0)}{' '}
                  {currentWithdrawRate?.currency ?? ''}
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Grid
          columns={{
            initial: '1',
            md: '3',
          }}
          align="center"
          className="gap-6"
        >
          <Flex className="col-span-1 border border-border-secondary divide-y divide-x divide-border-secondary rounded-lg flex-wrap sm:flex-nowrap">
            <Flex align="center" className="flex-1 p-4 gap-2">
              <Flex
                direction="column"
                align="center"
                justify="center"
                className="gap-2"
              >
                <Text className="font-semibold text-sm lg:text-base text-wrap text-surface-accent">
                  Pending Count & Amount
                </Text>
              </Flex>
            </Flex>

            <Flex
              direction="column"
              align="center"
              className="flex-1 divide-y divide-border-secondary"
            >
              <Text className="w-full p-4 text-sm lg:text-base">
                {DashboardData?.pendingCount}
              </Text>
              <Text className="w-full p-4 text-sm lg:text-base">
                {CurrencyFormat(DashboardData?.pendingAmount ?? 0)}
              </Text>
              {DashboardData?.withdrawDashboard?.WithdrawAccountHolder[0]
                ?.PaymentAccount?.cryptoNetworkId && (
                <Text className="w-full p-4 text-sm lg:text-base">
                  {CurrencyFormat(DashboardData?.pendingUsdt ?? 0)} USDT
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex className="col-span-1 border border-border-secondary divide-y divide-x divide-border-secondary rounded-lg flex-wrap sm:flex-nowrap">
            <Flex align="center" className="flex-1 p-4 gap-2">
              <Flex
                direction="column"
                align="center"
                justify="center"
                className="gap-2"
              >
                <Text className="font-semibold text-sm lg:text-base text-wrap text-text-success">
                  Accepted Count & Amount
                </Text>
              </Flex>
            </Flex>

            <Flex
              direction="column"
              align="center"
              className="flex-1 divide-y divide-border-secondary"
            >
              <Text className="w-full p-4 text-sm lg:text-base">
                {DashboardData?.acceptedCount}
              </Text>
              <Text className="w-full p-4 text-sm lg:text-base">
                {CurrencyFormat(DashboardData?.acceptedAmount ?? 0)}
              </Text>
              {DashboardData?.withdrawDashboard?.WithdrawAccountHolder[0]
                ?.PaymentAccount?.cryptoNetworkId && (
                <Text className="w-full p-4 text-sm lg:text-base">
                  {CurrencyFormat(DashboardData?.acceptedUsdt ?? 0)} USDT
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex className="col-span-1 border border-border-secondary divide-y divide-x divide-border-secondary rounded-lg flex-wrap sm:flex-nowrap">
            <Flex align="center" className="flex-1 p-4 gap-2">
              <Flex
                direction="column"
                align="center"
                justify="center"
                className="gap-2"
              >
                <Text className="font-semibold text-sm lg:text-base text-wrap text-text-error">
                  Rejected Count & Amount
                </Text>
              </Flex>
            </Flex>

            <Flex
              direction="column"
              align="center"
              className="flex-1 divide-y divide-border-secondary"
            >
              <Text className="w-full p-4 text-sm lg:text-base">
                {DashboardData?.rejectedCount}
              </Text>
              <Text className="w-full p-4 text-sm lg:text-base">
                {CurrencyFormat(DashboardData?.rejectedAmount ?? 0)}
              </Text>
              {DashboardData?.withdrawDashboard?.WithdrawAccountHolder[0]
                ?.PaymentAccount?.cryptoNetworkId && (
                <Text className="w-full p-4 text-sm lg:text-base">
                  {CurrencyFormat(DashboardData?.rejectedUsdt ?? 0)} USDT
                </Text>
              )}
            </Flex>
          </Flex>
        </Grid>
      </Card>
    </Box>
  );
};

export default WithdrawDashboard;
