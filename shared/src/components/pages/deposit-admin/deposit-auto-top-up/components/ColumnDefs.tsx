'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../../src/utils/currencyFormat';
import { Image } from '../../../../ui/image';
import { Button } from '../../../../ui/button';
import { DepositRecordHistoryListData } from '../../../../../types/deposit-auto-top-up.types';
import { DepositAutoTopupDetailsDialog } from './DepositAutoTopupDetailsDialog';
import { DepositAutoTopupConfirmDialog } from './DepositAutoTopupConfirmDialog';
import { DepositAutoTopupRejectDialog } from './DepositAutoTopupRejectDialog';

function TransactionId(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.transactionId}>
      <p className="max-w-24 truncate">{target.transactionId}</p>
    </Tooltip>
  );
}

function Player(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return (
    <Flex className="flex flex-col gap-2">
      <Tooltip content={target?.Player?.name}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate font-semibold">
          {target?.Player?.name}
        </p>
      </Tooltip>
      <p className="max-w-32 break-words whitespace-normal">
        {target?.Player?.email ?? target?.Player?.phone}
      </p>
    </Flex>
  );
}
function Screenshot(props: { target: DepositRecordHistoryListData }) {
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

function NetworkName(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.PaymentAccount?.CryptoNetwork?.name ?? '-'}>
      <p className="max-w-24 truncate">
        {target.PaymentAccount?.CryptoNetwork?.name ?? '-'}
      </p>
    </Tooltip>
  );
}

function DateTime(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function Amount(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.amount)}</Text>;
}

function USDTAmount(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.transferedAmount)}</Text>;
}

function Actions(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);
  return (
    <Flex align="center" className="gap-2">
      <Button
        size="sm"
        className="space-x-1 bg-surface-link"
        onClick={() => setViewModalOpen(true)}
      >
        Details
      </Button>
      <Button
        size="sm"
        className="space-x-1"
        variant="success"
        onClick={() => setConfirmModalOpen(true)}
      >
        Confirm
      </Button>
      <Button
        size="sm"
        className="space-x-1"
        variant="destructive"
        onClick={() => setRejectModalOpen(true)}
      >
        Reject
      </Button>
      {viewModalOpen && (
        <DepositAutoTopupDetailsDialog
          data={target}
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />
      )}
      {confirmModalOpen && (
        <DepositAutoTopupConfirmDialog
          data={target}
          open={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
        />
      )}
      {rejectModalOpen && (
        <DepositAutoTopupRejectDialog
          data={target}
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<DepositRecordHistoryListData>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell({ row }) {
      return <DateTime target={row.original} />;
    },
  },
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
      return <Amount target={row.original} />;
    },
  },
  {
    accessorKey: 'transactionId',
    header: 'TXN Number',
    cell({ row }) {
      return <TransactionId target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];

export const cryptoAdminColumnDefs: ColumnDef<DepositRecordHistoryListData>[] =
  [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell({ row }) {
        return <DateTime target={row.original} />;
      },
    },
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
        return <Amount target={row.original} />;
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
      header: 'Actions',
      cell({ row }) {
        return <Actions target={row.original} />;
      },
    },
  ];
