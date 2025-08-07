'use client';
import React from 'react';
import dayjs from '../../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { Image } from '../../../../../ui/image';
import { cn, CurrencyFormat } from '../../../../../../../src/utils';
import { DepositRecordHistoryDetailListData } from '../../../../../../types/deposit-record.types';
import { DepositRecordHistoryDetailsDialog } from './DepositRecordHistoryDetailsDialog';

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
function NetworkName(props: { target: DepositRecordHistoryDetailListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.PaymentAccount?.CryptoNetwork?.name}>
      <p className="max-w-24 truncate">
        {target.PaymentAccount?.CryptoNetwork?.name}
      </p>
    </Tooltip>
  );
}

function Player(props: { target: DepositRecordHistoryDetailListData }) {
  const { target } = props;
  return (
    <Flex className="flex flex-col gap-2">
      <Tooltip content={target.Player?.name}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.Player?.name ?? '-'}
        </p>
      </Tooltip>
      <p className="max-w-32 break-words whitespace-normal">
        {target?.Player?.email ?? target?.Player?.phone}
      </p>
    </Flex>
  );
}
function Screenshot(props: { target: DepositRecordHistoryDetailListData }) {
  const { target } = props;
  return (
    <Flex justify="center" className="w-12 h-12">
      {target.Image?.url ? (
        <Image
          src={target.Image.url}
          alt="screenshot"
          width={48}
          height={48}
          className="rounded-sm object-cover min-w-12 min-h-12"
        />
      ) : (
        <Text className="text-center">-</Text>
      )}
    </Flex>
  );
}

function TotalAmount(props: { target: DepositRecordHistoryDetailListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.amount)}</Text>;
}

function USDTAmount(props: { target: DepositRecordHistoryDetailListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.transferedAmount)}</Text>;
}

function DateTime(props: { target: DepositRecordHistoryDetailListData }) {
  const { target } = props;
  return (
    <Text className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </Text>
  );
}

function Status(props: { target: DepositRecordHistoryDetailListData }) {
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
        <DepositRecordHistoryDetailsDialog
          isCrypto={false}
          data={target}
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </>
  );
}

function CryptoStatus(props: { target: DepositRecordHistoryDetailListData }) {
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
        <DepositRecordHistoryDetailsDialog
          isCrypto={true}
          data={target}
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </>
  );
}

export const columnDefs: ColumnDef<DepositRecordHistoryDetailListData>[] = [
  {
    accessorKey: 'name',
    header: 'Player',
    cell({ row }) {
      return <Player target={row.original} />;
    },
  },
  {
    accessorKey: 'screenshot',
    header: 'Screenshot',
    cell({ row }) {
      return <Screenshot target={row.original} />;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell({ row }) {
      return <TotalAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'transactionId',
    header: 'TXN Number',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell({ row }) {
      return <DateTime target={row.original} />;
    },
  },
];

export const cryptoAdminColumnDefs: ColumnDef<DepositRecordHistoryDetailListData>[] =
  [
    {
      accessorKey: 'name',
      header: 'Player',
      cell({ row }) {
        return <Player target={row.original} />;
      },
    },
    {
      accessorKey: 'screenshot',
      header: 'Screenshot',
      cell({ row }) {
        return <Screenshot target={row.original} />;
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell({ row }) {
        return <TotalAmount target={row.original} />;
      },
    },
    {
      accessorKey: 'transferAmount',
      header: 'USDT Amount',
      cell({ row }) {
        return <USDTAmount target={row.original} />;
      },
    },
    {
      accessorKey: 'network',
      header: 'Network Name',
      cell({ row }) {
        return <NetworkName target={row.original} />;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell({ row }) {
        return <CryptoStatus target={row.original} />;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell({ row }) {
        return <DateTime target={row.original} />;
      },
    },
  ];
