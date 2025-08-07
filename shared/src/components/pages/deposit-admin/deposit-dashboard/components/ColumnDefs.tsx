'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { cn, CurrencyFormat } from '../../../../../../src/utils';
import { Button } from '../../../../ui/button';
import { Image } from '../../../../ui/image';
import { Icons } from '../../../../ui/icons';
import { DepositRequestDetailsDialog } from './DepositRequestDetailsDialog';
import { DepositDashboardRequestListData } from '../../../../../types/deposit-dashboard.types';

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

function TransactionId(props: { target: DepositDashboardRequestListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.transactionId}>
      <p className="max-w-24 truncate">{target.transactionId}</p>
    </Tooltip>
  );
}

function Player(props: { target: DepositDashboardRequestListData }) {
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
function Screenshot(props: { target: DepositDashboardRequestListData }) {
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
function NetworkName(props: { target: DepositDashboardRequestListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.PaymentAccount?.CryptoNetwork?.name}>
      <p className="max-w-24 truncate">
        {target.PaymentAccount?.CryptoNetwork?.name}
      </p>
    </Tooltip>
  );
}
function Amount(props: { target: DepositDashboardRequestListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.amount)}</Text>;
}

function USDTAmount(props: { target: DepositDashboardRequestListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.transferedAmount)}</Text>;
}

function Status(props: { target: DepositDashboardRequestListData }) {
  const { target } = props;
  return (
    <Flex align="center" className={cn('gap-1', getStatusColor(target.status))}>
      <Icons.CheckDouble />
      <Text>{target.status}</Text>
    </Flex>
  );
}

function DateTime(props: { target: DepositDashboardRequestListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function Actions(props: { target: DepositDashboardRequestListData }) {
  const { target } = props;
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  return (
    <Box className="">
      <Button
        size="sm"
        className="space-x-1 bg-surface-link"
        onClick={() => setViewModalOpen(true)}
      >
        Details
      </Button>
      {viewModalOpen && (
        <DepositRequestDetailsDialog
          data={target}
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </Box>
  );
}

export const columnDefs: ColumnDef<DepositDashboardRequestListData>[] = [
  {
    accessorKey: 'transactionId',
    header: 'TXN Number',
    cell({ row }) {
      return <TransactionId target={row.original} />;
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
    accessorKey: 'status',
    header: 'Status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date & Time',
    cell({ row }) {
      return <DateTime target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];

export const cryptoAdminColumnDefs: ColumnDef<DepositDashboardRequestListData>[] =
  [
    {
      accessorKey: 'network',
      header: 'Network Name',
      cell({ row }) {
        return <NetworkName target={row.original} />;
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
      accessorKey: 'status',
      header: 'Status',
      cell({ row }) {
        return <Status target={row.original} />;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Date & Time',
      cell({ row }) {
        return <DateTime target={row.original} />;
      },
    },
    {
      header: 'Actions',
      cell({ row }) {
        return <Actions target={row.original} />;
      },
    },
  ];
