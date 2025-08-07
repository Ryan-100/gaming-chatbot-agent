'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Image } from '../../../../ui/image';
import { Icons } from '../../../../ui/icons';
import Loading from '../../../../ui/loading';
import PropsTable from '../../../../shared/PropsTable';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { DepositRecordHistoryListData } from '../../../../../types/deposit-auto-top-up.types';
import { useGetDepositRateQuery } from '../../../../../stores/reducers/exchange-rate.reducer';
import { useGetDepositDashboardDetailTableQuery } from '../../../../../stores/reducers/deposit-dashboard.reducer';

interface DepositAutoTopupDetailsDialogProps {
  data: DepositRecordHistoryListData;
  open: boolean;
  onClose: () => void;
}

export const DepositAutoTopupDetailsDialog: React.FC<
  DepositAutoTopupDetailsDialogProps
> = ({ data, open, onClose }) => {
  const { data: DetailTableData } = useGetDepositDashboardDetailTableQuery({}); //to check crypto admin
  const isCrypto =
    DetailTableData?.body?.data?.paymentProvider?.PaymentType?.isCrypto;
  const { data: depositResponse, isLoading: depositLoading } =
    useGetDepositRateQuery({
      date: dayjs().format('YYYY-MM-DD'),
    });
  const currentDepositRate = depositResponse?.body?.data.latestExchangeRate;

  const initialTableData = [
    {
      key: isCrypto ? 'Network Name' : 'TXN Number',
      value: (
        <Tooltip
          content={
            isCrypto
              ? data?.PaymentAccount?.CryptoNetwork?.name ?? '-'
              : data?.transactionId
          }
          className="z-50"
        >
          <p className="w-fit max-w-32 truncate">
            {isCrypto
              ? data?.PaymentAccount?.CryptoNetwork?.name ?? '-'
              : data?.transactionId}
          </p>
        </Tooltip>
      ),
    },
    {
      key: 'Date & Time',
      value: dayjs(data?.createdAt).format('DD MMM YYYY, h:mm A') || '',
    },
    {
      key: 'To Account',
      value: data?.Player && (
        <Flex direction="column">
          <Tooltip content={data?.Player?.name} className="z-50">
            <p className="font-medium max-w-32 truncate">
              {data?.Player?.name}
            </p>
          </Tooltip>
          <Tooltip
            content={data?.Player?.phone ?? data?.Player?.email}
            className="z-50"
          >
            <p className="max-w-32 truncate">
              {data?.Player?.phone ?? data?.Player?.email}
            </p>
          </Tooltip>
        </Flex>
      ),
    },
    {
      key: 'Transfered Account',
      value: data?.PaymentAccount && (
        <Flex direction="column">
          <Tooltip content={data?.PaymentAccount?.accountName} className="z-50">
            <p className="font-medium max-w-32 truncate">
              {data?.PaymentAccount?.accountName}
            </p>
          </Tooltip>
          <Tooltip
            content={data?.PaymentAccount?.accountNumber}
            className="z-50"
          >
            <p className="max-w-32 truncate">
              {data?.PaymentAccount?.accountNumber}
            </p>
          </Tooltip>
        </Flex>
      ),
    },
    {
      key: 'Total Amount',
      value: <Text className="">{CurrencyFormat(data?.amount)}</Text>,
    },
  ];
  const [tableData, setTableData] = React.useState(initialTableData);

  React.useEffect(() => {
    const newTableData = [...initialTableData]; // Clone the initial table data
    if (isCrypto) {
      newTableData.push({
        key: 'Total USDT',
        value: (
          <Text className="">{CurrencyFormat(data?.transferedAmount)}</Text>
        ),
      });
      newTableData.push({
        key: 'Exchange Rate',
        value: (
          <Text className="">
            1 USDT = {CurrencyFormat(currentDepositRate?.amountPerUsdt ?? 0)}{' '}
            {currentDepositRate?.currency ?? ''}
          </Text>
        ),
      });
    }
    setTableData(newTableData);
  }, [data, depositResponse]);

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px] py-0">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle>Deposit Details</DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        {depositLoading ? (
          <Loading />
        ) : (
          <>
            <PropsTable rows={tableData} />
            {!!data?.Image && (
              <Flex
                direction={'column'}
                align={'center'}
                justify={'center'}
                className="gap-4"
              >
                <p className="font-semibold text-sm self-start w-full px-4">
                  Screenshot
                </p>
                <Image
                  src={data?.Image?.url ?? ''}
                  alt="screenshot"
                  width={300}
                  height={500}
                  className="rounded-sm object-cover w-1/2 h-auto"
                />
              </Flex>
            )}
          </>
        )}
        <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
          <Button onClick={onClose} color="primary">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
