'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Text, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import { CurrencyFormat } from '../../../../../../src/utils/currencyFormat';
import {
  CategoryReportListData,
  NetworkReportListData,
} from '../../../../../types/report-crypto.types';

function DepositAmount(props: { target: CategoryReportListData }) {
  const { target } = props;
  return (
    <Text className="">
      {target.depositCount} / {CurrencyFormat(target.depositUsdt)}
    </Text>
  );
}

function WithdrawAmount(props: { target: CategoryReportListData }) {
  const { target } = props;
  return (
    <Text className="">
      {target.withdrawalCount} / {CurrencyFormat(target.withdrawalUsdt)}
    </Text>
  );
}

function PaymentCategory(props: { target: CategoryReportListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.categoryName}>
      <p className="w-fit sm:max-w-[100px] md:max-w-32 lg:max-w-60 xl:max-w-80 truncate">
        {target.categoryName}
      </p>
    </Tooltip>
  );
}

function Actions(props: { target: CategoryReportListData }) {
  const { target } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const time = searchParams.get('time');

  const handleDetailsClick = () => {
    router.push(
      `/crypto-report/${target.categoryId}?name=${target?.categoryName}&type=${type}&time=${time}&categoryId=${target.categoryId}`
    );
  };
  return (
    <Button
      className="w-6 h-6 p-1"
      variant={'outline'}
      onClick={handleDetailsClick}
    >
      <Icons.Right className="w-4 h-4" />
    </Button>
  );
}

export const categoryColumnDefs: ColumnDef<CategoryReportListData>[] = [
  {
    accessorKey: 'categoryName',
    header: 'Payment Category',
    cell({ row }) {
      return <PaymentCategory target={row.original} />;
    },
  },
  {
    accessorKey: 'deposit',
    header: 'Deposit TXN Counts / Amount (USDT)',
    cell({ row }) {
      return <DepositAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'withdraw',
    header: 'Withdraw TXN Counts / Amount (USDT)',
    cell({ row }) {
      return <WithdrawAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'detail',
    header: '',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];

function DepositAmountNetwork(props: { target: NetworkReportListData }) {
  const { target } = props;
  return (
    <Text className="flex-1">
      {target.depositCount} / {CurrencyFormat(target.depositUsdt)}
    </Text>
  );
}

function WithdrawAmountNetwork(props: { target: NetworkReportListData }) {
  const { target } = props;
  return (
    <Text className="flex-1">
      {target.withdrawalCount} / {CurrencyFormat(target.withdrawalUsdt)}
    </Text>
  );
}

function Network(props: { target: NetworkReportListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.networkName} className="flex-1">
      <p className="w-fit sm:max-w-[100px] md:max-w-32 lg:max-w-60 xl:max-w-80 truncate">
        {target.networkName}
      </p>
    </Tooltip>
  );
}

export const networkColumnDefs: ColumnDef<NetworkReportListData>[] = [
  {
    accessorKey: 'network',
    header: 'Network',
    size: 150,
    minSize: 150,
    cell({ row }) {
      return <Network target={row.original} />;
    },
  },
  {
    accessorKey: 'deposit',
    header: 'Deposit TXN Counts / Amount (USDT)',
    size: 150,
    minSize: 150,
    cell({ row }) {
      return <DepositAmountNetwork target={row.original} />;
    },
  },
  {
    accessorKey: 'withdraw',
    header: 'Withdraw TXN Counts / Amount (USDT)',
    size: 150,
    minSize: 150,
    cell({ row }) {
      return <WithdrawAmountNetwork target={row.original} />;
    },
  },
];
