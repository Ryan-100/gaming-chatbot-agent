'use client';
import React from 'react';
import { Text, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { CurrencyFormat } from '../../../../../../src/utils/currencyFormat';
import { AccountListData } from '../../../../../types/report-payment.types';

function Amount(props: { target: AccountListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.totalAmount)}</Text>;
}

function AccountNumber(props: { target: AccountListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.accountNumber}>
      <p className="max-w-24 lg:max-w-32 xl:max-w-fit truncate">
        {target.accountNumber}
      </p>
    </Tooltip>
  );
}

function PaymentMethod(props: { target: AccountListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.paymentMethod}>
      <p className="max-w-24 lg:max-w-32 xl:max-w-fit truncate">
        {target.paymentMethod}
      </p>
    </Tooltip>
  );
}

export const columnDefs: ColumnDef<AccountListData>[] = [
  {
    accessorKey: 'levelName',
    header: 'User Level',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Phone',
    cell({ row }) {
      return <AccountNumber target={row.original} />;
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell({ row }) {
      return <PaymentMethod target={row.original} />;
    },
  },
  {
    accessorKey: 'totalCount',
    header: 'Count',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
];
