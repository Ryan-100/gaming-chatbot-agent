'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text } from '@radix-ui/themes';
import { ExchangeRateData } from '../../../../../types/exchange-rete.types';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';

export const depositExchangeRateColumnDefs: ColumnDef<ExchangeRateData>[] = [
  {
    accessorKey: 'updatedAt',
    header: 'Deposit Updated Date',
    cell: ({ row }) => (
      <Flex className="min-w-32 w-32">
        {dayjs(row?.original?.updatedAt).format('MMM DD, YYYY, h:mm A')}
      </Flex>
    ),
  },
  {
    accessorKey: 'amountPerUsdt',
    header: 'FIAT Amount in 1 USDT',
    cell({ row }) {
      return <Text>{CurrencyFormat(row.original.amountPerUsdt)}</Text>;
    },
  },
];

export const withdrawExchangeRateColumnDefs: ColumnDef<ExchangeRateData>[] = [
  {
    accessorKey: 'updatedAt',
    header: 'Withdraw Updated Date',
    cell: ({ row }) => (
      <Flex className="min-w-32 w-32">
        {dayjs(row?.original?.updatedAt).format('MMM DD, YYYY, h:mm A')}
      </Flex>
    ),
  },
  {
    accessorKey: 'rate',
    header: 'FIAT Amount in 1 USDT',
    cell({ row }) {
      return <Text>{CurrencyFormat(row.original.amountPerUsdt)}</Text>;
    },
  },
];
