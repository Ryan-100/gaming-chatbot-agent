'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Text } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../../src/utils';
import { WithdrawReportListData } from '../../../../../types/withdraw-report.types';
import Link from 'next/link';

function AcceptedAmount(props: { target: WithdrawReportListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.totalAcceptedAmount)}</Text>;
}

function AcceptedUSDTAmount(props: { target: WithdrawReportListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.acceptedUsdt ?? 0)}</Text>;
}

function RejectedAmount(props: { target: WithdrawReportListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.totalRejectedAmount)}</Text>;
}

function RejectedUSDTAmount(props: { target: WithdrawReportListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.rejectedUsdt ?? 0)}</Text>;
}

function EntryData(props: {
  target: number;
  time: string;
  type: string;
  requestType: string;
}) {
  return (
    <Link
      href={`/withdraw-report/details?type=${props.type}&time=${props.time}&requestType=${props.requestType}`}
      className=""
    >
      <Text className="text-primary font-semibold">
        {CurrencyFormat(props.target)}
      </Text>
    </Link>
  );
}

function DateTime(props: { target: WithdrawReportListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.date).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

export const columnDefs: ColumnDef<WithdrawReportListData>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell({ row }) {
      return <DateTime target={row.original} />;
    },
  },
  {
    accessorKey: 'acceptedCount',
    header: 'Accepted Entry',
    cell({ row }) {
      return (
        <EntryData
          target={row.original.acceptedCount}
          time={row.original.date}
          type={'MONTHLY'}
          requestType={'VERIFIED'}
        />
      );
    },
  },
  {
    accessorKey: 'acceptedAmount',
    header: 'Accepted Amount',
    cell({ row }) {
      return <AcceptedAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'rejectedCount',
    header: 'Rejected Entry',
    cell({ row }) {
      return (
        <EntryData
          target={row.original.rejectedCount}
          time={row.original.date}
          type={'MONTHLY'}
          requestType={'REJECTED'}
        />
      );
    },
  },
  {
    accessorKey: 'rejectedAmount',
    header: 'Rejected Amount',
    cell({ row }) {
      return <RejectedAmount target={row.original} />;
    },
  },
];

export const cryptoAdminColumnDefs: ColumnDef<WithdrawReportListData>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell({ row }) {
      return <DateTime target={row.original} />;
    },
  },
  {
    accessorKey: 'acceptedCount',
    header: 'Accepted Entry',
    cell({ row }) {
      return (
        <EntryData
          target={row.original.acceptedCount}
          time={row.original.date}
          type={'MONTHLY'}
          requestType={'VERIFIED'}
        />
      );
    },
  },
  {
    accessorKey: 'acceptedAmount',
    header: 'Accepted Amount',
    cell({ row }) {
      return <AcceptedAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'acceptedUsdt',
    header: 'Accepted USDT Amount',
    cell({ row }) {
      return <AcceptedUSDTAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'rejectedCount',
    header: 'Rejected Entry',
    cell({ row }) {
      return (
        <EntryData
          target={row.original.rejectedCount}
          time={row.original.date}
          type={'MONTHLY'}
          requestType={'REJECTED'}
        />
      );
    },
  },
  {
    accessorKey: 'rejectedAmount',
    header: 'Rejected Amount',
    cell({ row }) {
      return <RejectedAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'rejectedUsdt',
    header: 'Rejected USDT Amount',
    cell({ row }) {
      return <RejectedUSDTAmount target={row.original} />;
    },
  },
];
