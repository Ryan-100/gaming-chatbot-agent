'use client';
import React from 'react';
import dayjs from '../../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { cn, CurrencyFormat } from '../../../../../../../src/utils';
import { WithdrawReportDetailListData } from '../../../../../../types/withdraw-report.types';
import { WithdrawReportDetailsDialog } from './WithdrawReportDetailsDialog';

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

function ReceivingAccount(props: { target: WithdrawReportDetailListData }) {
  const { target } = props;

  return (
    <div className="space-y-1">
      <Tooltip content={target.Player.PlayerPaymentAccount.accountnumber}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.Player.PlayerPaymentAccount.accountnumber}
        </p>
      </Tooltip>
      <Tooltip content={target.Player.PlayerPaymentAccount.accountName}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.Player.PlayerPaymentAccount.accountName}
        </p>
      </Tooltip>
    </div>
  );
}

function NetworkName(props: { target: WithdrawReportDetailListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.Player?.PlayerPaymentAccount?.CryptoNetwork?.name}>
      <p className="max-w-24">
        {target.Player?.PlayerPaymentAccount?.CryptoNetwork?.name ?? '-'}
      </p>
    </Tooltip>
  );
}
function RejectReason(props: { target: WithdrawReportDetailListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.reason ?? ''}>
      <p className="max-w-24 truncate">{target.reason ?? ''}</p>
    </Tooltip>
  );
}

function TotalAmount(props: { target: WithdrawReportDetailListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.amount)}</Text>;
}

function USDTAmount(props: { target: WithdrawReportDetailListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.receiveableAmount)}</Text>;
}

function DateTime(props: { target: WithdrawReportDetailListData }) {
  const { target } = props;
  return (
    <Text className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </Text>
  );
}

function Status(props: { target: WithdrawReportDetailListData }) {
  const { target } = props;
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  return (
    <>
      <Text
        className={cn(
          'capitalize font-medium cursor-pointer',
          getStatusColor(target.status)
        )}
        onClick={() => setViewModalOpen(true)}
      >
        {target.status.toLowerCase() ?? '-'}
      </Text>
      {viewModalOpen && (
        <WithdrawReportDetailsDialog
          data={target}
          open={viewModalOpen}
          isCrypto={false}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </>
  );
}
function CryptoStatus(props: { target: WithdrawReportDetailListData }) {
  const { target } = props;
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  return (
    <>
      <Text
        className={cn(
          'capitalize font-medium cursor-pointer',
          getStatusColor(target.status)
        )}
        onClick={() => setViewModalOpen(true)}
      >
        {target.status.toLowerCase() ?? '-'}
      </Text>
      {viewModalOpen && (
        <WithdrawReportDetailsDialog
          data={target}
          isCrypto={true}
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </>
  );
}

export const getColumnDefs = (
  isCrypto: boolean,
  isRejected: boolean
): ColumnDef<WithdrawReportDetailListData>[] => {
  const columnDefs: ColumnDef<WithdrawReportDetailListData>[] = [
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell({ row }) {
        return <TotalAmount target={row.original} />;
      },
    },
    {
      accessorKey: 'account',
      header: 'Receiving Account',
      cell({ row }) {
        return <ReceivingAccount target={row.original} />;
      },
    },
  ];

  if (isCrypto) {
    columnDefs.push({
      accessorKey: 'network',
      header: 'Network Name',
      cell({ row }) {
        return <NetworkName target={row.original} />;
      },
    });
    columnDefs.push({
      accessorKey: 'status',
      header: 'Status',
      cell({ row }) {
        return <CryptoStatus target={row.original} />;
      },
    });
  } else {
    columnDefs.push({
      accessorKey: 'status',
      header: 'Status',
      cell({ row }) {
        return <Status target={row.original} />;
      },
    });
  }

  if (isRejected) {
    columnDefs.push({
      accessorKey: 'reason',
      header: 'Reject Reason',
      cell({ row }) {
        return <RejectReason target={row.original} />;
      },
    });
  }
  if (isCrypto) {
    columnDefs.splice(2, 0, {
      accessorKey: 'transferAmount',
      header: 'USDT Amount',
      cell({ row }) {
        return <USDTAmount target={row.original} />;
      },
    });
  } else {
    columnDefs.splice(2, 0, {
      accessorKey: 'transactionId',
      header: 'TXN Number',
    });
  }

  columnDefs.push({
    accessorKey: 'createdAt',
    header: 'Date',
    cell({ row }) {
      return <DateTime target={row.original} />;
    },
  });

  return columnDefs;
};
