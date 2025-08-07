import React from 'react';
import dayjs from '../../../../../../utils/dayjs';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../ui/dialog';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import { Image } from '../../../../../ui/image';
import PropsTable from '../../../../../shared/PropsTable';
import { DepositRecordHistoryDetailListData } from '../../../../../../types/deposit-record.types';
import { cn } from '../../../../../../utils/cn';
import { CurrencyFormat } from '../../../../../../utils/currencyFormat';

interface DepositRecordHistoryDetailsDialogProps {
  data: DepositRecordHistoryDetailListData;
  isCrypto: boolean;
  open: boolean;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PREACCEPTED':
      return 'text-surface-accent';
    case 'PENDING':
      return 'text-surface-accent';
    case 'ACCEPTED':
      return 'text-text-success';
    case 'REJECTED':
      return 'text-text-error';
    default:
      return 'text-primary';
  }
};

export const DepositRecordHistoryDetailsDialog: React.FC<
  DepositRecordHistoryDetailsDialogProps
> = ({ data, isCrypto, open, onClose }) => {
  const initialTableData = [
    {
      key: 'Date',
      value: (
        <Text className="w-32 min-w-32">
          {dayjs(data?.createdAt).format('DD MMM YYYY, h:mm A') || ''}
        </Text>
      ),
    },

    {
      key: 'Status',
      value: (
        <Text
          className={cn(
            'capitalize font-medium cursor-pointer',
            getStatusColor(data?.status)
          )}
        >
          {data?.status.toLowerCase() ?? '-'}
        </Text>
      ),
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
      key: 'Amount',
      value: <Text className="">{CurrencyFormat(data?.amount)}</Text>,
    },
  ];
  const [tableData, setTableData] = React.useState(initialTableData);

  React.useEffect(() => {
    const newTableData = [...initialTableData]; // Clone the initial table data
    if (isCrypto) {
      newTableData.push({
        key: 'Transfered Amount',
        value: (
          <Text className="">
            {CurrencyFormat(data?.transferedAmount)} USDT
          </Text>
        ),
      });
      newTableData.push({
        key: 'Exchange Rate',
        value: (
          <Text className="">
            1 USDT = {CurrencyFormat(data?.ExchangeRate?.amountPerUsdt)}{' '}
            {data?.ExchangeRate?.currency}
          </Text>
        ),
      });
    } else {
      const transactionId = {
        key: 'TXN Number',
        value: <p>{data?.transactionId}</p>,
      };
      newTableData.splice(0, 0, transactionId);
    }
    setTableData(newTableData);
  }, [data]);

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px] py-0">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle>Deposit Record Details</DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
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
        <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
          <Button onClick={onClose} color="primary">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
