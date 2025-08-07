'use client';
import React, { useState } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { Card } from '../../../ui/card';
import { DatePicker } from '../../../ui/date-picker';
import { RateUpdateFormDialog } from './components/RateUpdateFormDialog';
import {
  depositExchangeRateColumnDefs,
  withdrawExchangeRateColumnDefs,
} from './components/ColumnDefs';
import {
  useGetWithdrawRateQuery,
  useGetDepositRateQuery,
} from '../../../../stores/reducers/exchange-rate.reducer';
import dayjs from '../../../../utils/dayjs';
import Loading from '../../../ui/loading';
import { PAGINATION } from '../../../../data/constants';
import { toast } from 'sonner';
import EditButton from '../../../shared/buttons/EditButton';

const DATE_FORMAT = 'YYYY-MM-DD';

const ExchangeRates = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [query, setQuery] = useState({
    date: dayjs(date).format(DATE_FORMAT),
    pageIndex: PAGINATION.defaultPage,
    rowPerPage: PAGINATION.rowPerPage,
  });
  const {
    data: depositResponse,
    isLoading: depositLoading,
    isError: isDepositError,
    error: depositError,
  } = useGetDepositRateQuery({
    date: query.date,
    pagination: { pageIndex: query.pageIndex, rowPerPage: query.rowPerPage },
  });

  const {
    data: withdrawResponse,
    isLoading: withdrawLoading,
    isError: isWithdrawError,
    error: withdrawError,
  } = useGetWithdrawRateQuery({
    date: query.date,
    pagination: { pageIndex: query.pageIndex, rowPerPage: query.rowPerPage },
  });

  const currentDepositRate = depositResponse?.body?.data.latestExchangeRate;
  const currentWithdrawRate = withdrawResponse?.body?.data.latestExchangeRate;

  const [depositModalOpen, setDepositModalOpen] = React.useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = React.useState(false);

  if (depositLoading || withdrawLoading) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loading />
      </div>
    );
  }

  if (isDepositError) {
    const error: any = depositError;
    toast.error(error?.data?.meta?.message);
  }

  if (isWithdrawError) {
    const error: any = withdrawError;
    toast.error(error?.data?.meta?.message);
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setQuery((prev) => ({
        ...prev,
        date: dayjs(date).format(DATE_FORMAT),
      }));
    }
  };

  return (
    <Flex direction="column" className="gap-y-6">
      <Flex className="gap-4 flex-wrap w-full">
        <Card className="flex-1 p-6 flex flex-col gap-y-2 min-w-1/2">
          <Text className="text-base">Current Deposit Exchange Rate</Text>
          <Flex align="center" justify="between" className="gap-2">
            <Text className="text-base">1 USDT =</Text>
            {currentDepositRate?.updatedAt && (
              <Text className="text-xs text-secondary">
                Last updated{' '}
                {dayjs(currentDepositRate.updatedAt).format(
                  'MMMM D, YYYY, h:mm A'
                )}
              </Text>
            )}
          </Flex>
          <Flex align="center" justify="between" className="gap-2">
            <Text className="text-[32px]">
              {currentDepositRate?.amountPerUsdt ?? 0}
              <Text as="span" className="text-base md:text-base lg:text-xl">
                {currentDepositRate?.currency ?? ''}
              </Text>
            </Text>
            <EditButton
              className="bg-surface-accent"
              onClick={() => setDepositModalOpen(true)}
              name="Update Deposit Rate"
            />
          </Flex>
        </Card>
        <Card className="flex-1 p-6 flex flex-col gap-y-2 min-w-1/2">
          <Text className="text-base">Current Withdraw Exchange Rate</Text>
          <Flex align="center" justify="between" className="gap-2">
            <Text className="text-base">1 USDT =</Text>
            {currentDepositRate?.updatedAt && (
              <Text className="text-xs text-secondary">
                Last updated{' '}
                {dayjs(currentWithdrawRate?.updatedAt).format(
                  'MMMM D, YYYY, h:mm A'
                )}
              </Text>
            )}
          </Flex>
          <Flex align="center" justify="between" className="gap-2">
            <Text className="text-[32px]">
              {currentWithdrawRate?.amountPerUsdt}
              <Text as="span" className="text-base md:text-base lg:text-xl">
                {currentWithdrawRate?.currency}
              </Text>
            </Text>
            <EditButton
              variant="success"
              onClick={() => setWithdrawModalOpen(true)}
              name="Update Withdraw Rate"
            />
          </Flex>
        </Card>
      </Flex>

      <Flex>
        <DatePicker
          className="bg-background w-[149px]"
          setDate={handleDateChange}
          dateFormat={DATE_FORMAT}
          date={date}
        />
      </Flex>

      <Flex align="start" className="gap-4 flex flex-col sm:flex-row w-full">
        <Flex
          direction="column"
          className="flex-1 gap-y-2 min-w-[30vw] w-full sm:min-w-1/2"
        >
          <DataTable
            data={depositResponse?.body?.data.exchangeRateList ?? []}
            columns={depositExchangeRateColumnDefs}
          />
        </Flex>
        <Flex
          direction="column"
          className="flex-1 gap-y-2 min-w-[30vw] w-full sm:min-w-1/2"
        >
          <DataTable
            data={withdrawResponse?.body?.data.exchangeRateList ?? []}
            columns={withdrawExchangeRateColumnDefs}
          />
        </Flex>
      </Flex>
      {depositModalOpen && (
        <RateUpdateFormDialog
          type="Deposit"
          currency={currentDepositRate?.currency ?? ''}
          open={depositModalOpen}
          onClose={() => setDepositModalOpen(false)}
        />
      )}
      {withdrawModalOpen && (
        <RateUpdateFormDialog
          type="Withdraw"
          currency={currentWithdrawRate?.currency ?? ''}
          open={withdrawModalOpen}
          onClose={() => setWithdrawModalOpen(false)}
        />
      )}
    </Flex>
  );
};

export default ExchangeRates;
