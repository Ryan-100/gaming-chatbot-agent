'use client';
import React from 'react';
import dayjs from '../../../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { Image } from '../../../../../../ui/image';
import { maskChar } from '../../../../../../../utils/maskChar';
import { CurrencyFormat } from '../../../../../../../utils/currencyFormat';
import { TransactionByPlayerListData } from '../../../../../../../types/transaction-by-player.types';

function Amount(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.amount)}</Text>;
}

function Type(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return <Text>{target.type}</Text>;
}

function Status(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return <Text className="capitalize">{target.status.toLowerCase()}</Text>;
}

function Payment(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return (
    <Flex align="center" className="gap-x-2 w-24 min-w-24">
      {target.PaymentCategory.File?.url ? (
        <Image
          src={target.PaymentCategory.File?.url}
          alt="payment type"
          width={32}
          height={32}
          className="w-8 h-8 rounded-lg object-cover"
        />
      ) : (
        <Text>-</Text>
      )}
      <Tooltip content={target.PaymentCategory.accountType}>
        <p className="font-semibold w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.PaymentCategory.accountType}
        </p>
      </Tooltip>
    </Flex>
  );
}

function TransactionDigit(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return <Text className="">{target?.transactionId ?? '-'}</Text>;
}

function DateAndTime(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function Account(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return (
    <Flex justify="center" align="center" className="w-32 min-w-32">
      <Text>
        {target.PaymentAccount.accountName}(
        {maskChar(target.PaymentAccount.accountName)})
      </Text>
    </Flex>
  );
}

export const columnDefs: ColumnDef<TransactionByPlayerListData>[] = [
  {
    accessorKey: 'amount',
    header: 'Amt.',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    accessorKey: 'account',
    header: 'Account',
    cell({ row }) {
      return <Account target={row.original} />;
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell({ row }) {
      return <Type target={row.original} />;
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
    accessorKey: 'transactionId',
    header: 'TXN ID.',
    cell({ row }) {
      return <TransactionDigit target={row.original} />;
    },
  },
  {
    accessorKey: 'payment',
    header: 'Payment',
    cell({ row }) {
      return <Payment target={row.original} />;
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
