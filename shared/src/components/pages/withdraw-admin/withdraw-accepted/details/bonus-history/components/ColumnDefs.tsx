'use client';
import React from 'react';
import dayjs from '../../../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { cn } from '../../../../../../../utils/cn';
import { CurrencyFormat } from '../../../../../../../utils/currencyFormat';
import { BonusHistoryByPlayerListData } from '../../../../../../../types/bonus-history.types';

function Amount(props: { target: BonusHistoryByPlayerListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.amount)}</Text>;
}

function BonusType(props: { target: BonusHistoryByPlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.bonusType}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.bonusType}
      </p>
    </Tooltip>
  );
}

function Status(props: { target: BonusHistoryByPlayerListData }) {
  const { target } = props;
  return (
    <Text className="capitalize">
      {target.bonusStatus.toLowerCase() === 'null'
        ? '-'
        : target.bonusStatus.toLowerCase()}
    </Text>
  );
}

function ExpiredTime(props: { target: BonusHistoryByPlayerListData }) {
  const { target } = props;
  return (
    <p
      className={cn(
        'w-32 min-w-32',
        target.bonusStatus === 'EXPIRED' && 'text-text-error'
      )}
    >
      {dayjs(target.expireTime).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function DateAndTime(props: { target: BonusHistoryByPlayerListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

export const columnDefs: ColumnDef<BonusHistoryByPlayerListData>[] = [
  {
    accessorKey: 'type',
    header: 'Bonus Type',
    cell({ row }) {
      return <BonusType target={row.original} />;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amt.',
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
    accessorKey: 'expireTime',
    header: 'Valid Until',
    cell({ row }) {
      return <ExpiredTime target={row.original} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date & Time',
    cell({ row }) {
      return <DateAndTime target={row.original} />;
    },
  },
];
