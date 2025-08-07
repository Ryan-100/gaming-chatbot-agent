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
import PropsTable from '../../../../../shared/PropsTable';
import { WithdrawReportDetailListData } from '../../../../../../types/withdraw-report.types';
import { cn } from '../../../../../../utils/cn';
import { CurrencyFormat } from '../../../../../../utils/currencyFormat';

interface WithdrawReportDetailsDialogProps {
  data: WithdrawReportDetailListData;
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

export const WithdrawReportDetailsDialog: React.FC<
  WithdrawReportDetailsDialogProps
> = ({ data, isCrypto, open, onClose }) => {
  const initialTableData = [
    {
      key: 'Date',
      value: (
        <p className="w-32 min-w-32">
          {dayjs(data?.createdAt).format('DD MMM YYYY, h:mm A') || ''}
        </p>
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
      value: data?.Player?.PlayerPaymentAccount && (
        <Flex direction="column">
          <Tooltip
            content={data?.Player?.PlayerPaymentAccount?.accountName}
            className="z-50"
          >
            <p className="font-medium max-w-32 truncate">
              {data?.Player?.PlayerPaymentAccount?.accountName}
            </p>
          </Tooltip>
          <Tooltip
            content={data?.Player?.PlayerPaymentAccount?.accountnumber}
            className="z-50"
          >
            <p className="max-w-32 truncate">
              {data?.Player?.PlayerPaymentAccount?.accountnumber}
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
    if (isCrypto) {
      const newTableData = [...initialTableData]; // Clone the initial table data
      newTableData.push({
        key: 'Memo',
        value: (
          <Tooltip
            content={data?.Player?.PlayerPaymentAccount?.accountName}
            className="z-50"
          >
            <p className="font-medium max-w-32">
              {data?.Player?.PlayerPaymentAccount?.memo ?? '-'}
            </p>
          </Tooltip>
        ),
      });
      newTableData.push({
        key: 'Receiveable Amount',
        value: (
          <Text className="">
            {CurrencyFormat(data?.receiveableAmount)} USDT
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
      setTableData(newTableData);
    }
  }, [data]);

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle>Withdraw Report Details</DialogTitle>
        <PropsTable rows={tableData} />
        <DialogFooter>
          <Button onClick={onClose} color="primary">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
