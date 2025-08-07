'use client';
import React from 'react';
import Link from 'next/link';
import dayjs from '../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Text } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../../src/utils';
import { DepositRecordHistoryListData } from '../../../../../types/deposit-record.types';

function TotalAmount(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.total_amount)}</Text>;
}

function TotalUSDTAmount(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return (
    <Text className="">
      {CurrencyFormat(target.total_transfered_amount ?? 0)}
    </Text>
  );
}

function DateTime(props: { target: DepositRecordHistoryListData }) {
  const { target } = props;
  return (
    <Text className="w-32 min-w-32">
      {target.createdAtDate
        ? dayjs(target.createdAtDate).format('DD MMM YYYY')
        : dayjs(target.createdAtMonth).format('MMMM')}
    </Text>
  );
}

function EntryData(props: {
  target: number;
  time: string;
  type: string;
  requestType: string;
}) {
  return (
    <Link
      href={`/deposit-record-history/details?type=${props.type}&time=${props.time}&requestType=${props.requestType}`}
      className=""
    >
      <Text className="text-primary font-semibold">
        {CurrencyFormat(props.target)}
      </Text>
    </Link>
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
    accessorKey: 'total_request',
    header: 'Total Entry',
    cell({ row }) {
      return (
        <EntryData
          target={row.original.total_request}
          time={row.original.createdAtDate ?? row.original.createdAtMonth}
          type={row.original.createdAtDate ? 'MONTHLY' : 'YEARLY'}
          requestType={''}
        />
      );
    },
  },
  {
    accessorKey: 'total_amount',
    header: 'Total Amount',
    cell({ row }) {
      return <TotalAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'confirmed_count',
    header: 'Verified Entry',
    cell({ row }) {
      return (
        <EntryData
          target={row.original.confirmed_count}
          time={row.original.createdAtDate ?? row.original.createdAtMonth}
          type={row.original.createdAtDate ? 'MONTHLY' : 'YEARLY'}
          requestType={'VERIFIED'}
        />
      );
    },
  },
  {
    accessorKey: 'pending_count',
    header: 'Pending Entry',
    cell({ row }) {
      return (
        <EntryData
          target={row.original.pending_count}
          time={row.original.createdAtDate ?? row.original.createdAtMonth}
          type={row.original.createdAtDate ? 'MONTHLY' : 'YEARLY'}
          requestType={'PENDING'}
        />
      );
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
      accessorKey: 'total_request',
      header: 'Total Entry',
      cell({ row }) {
        return (
          <EntryData
            target={row.original.total_request}
            time={row.original.createdAtDate ?? row.original.createdAtMonth}
            type={row.original.createdAtDate ? 'MONTHLY' : 'YEARLY'}
            requestType={''}
          />
        );
      },
    },
    {
      accessorKey: 'total_amount',
      header: 'Total Amount',
      cell({ row }) {
        return <TotalAmount target={row.original} />;
      },
    },
    {
      accessorKey: 'total_transfered_amount',
      header: 'Total USDT Amount',
      cell({ row }) {
        return <TotalUSDTAmount target={row.original} />;
      },
    },
    {
      accessorKey: 'confirmed_count',
      header: 'Verified Entry',
      cell({ row }) {
        return (
          <EntryData
            target={row.original.confirmed_count}
            time={row.original.createdAtDate ?? row.original.createdAtMonth}
            type={row.original.createdAtDate ? 'MONTHLY' : 'YEARLY'}
            requestType={'VERIFIED'}
          />
        );
      },
    },
    {
      accessorKey: 'pending_count',
      header: 'Pending Entry',
      cell({ row }) {
        return (
          <EntryData
            target={row.original.pending_count}
            time={row.original.createdAtDate ?? row.original.createdAtMonth}
            type={row.original.createdAtDate ? 'MONTHLY' : 'YEARLY'}
            requestType={'PENDING'}
          />
        );
      },
    },
  ];
