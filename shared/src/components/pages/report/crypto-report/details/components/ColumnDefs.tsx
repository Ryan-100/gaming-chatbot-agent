'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { Image } from '../../../../../ui/image';
import { Button } from '../../../../../ui/button';
import { CurrencyFormat } from '../../../../../../../src/utils/currencyFormat';
import { DepositReportListData } from '../../../../../../types/report-crypto.types';
import { useRouter, useSearchParams } from 'next/navigation';

function PaymentImage(props: { target: DepositReportListData }) {
  const { target } = props;

  return (
    <img
      src={target.image ?? ''}
      alt="paymentType"
      width={32}
      height={32}
      className="object-cover min-w-8 min-h-8 rounded-lg"
    />
  );
}

function PaymentInfo(props: { target: DepositReportListData }) {
  const { target } = props;

  return (
    <Box className="space-y-1">
      <Tooltip content={target.networkName}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.networkName}
        </p>
      </Tooltip>
      <Tooltip content={target.accountNumber}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.accountNumber}
        </p>
      </Tooltip>
    </Box>
  );
}

function TXNCounts(props: { target: DepositReportListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.txnCount)}</Text>;
}

function TXNAmount(props: { target: DepositReportListData }) {
  const { target } = props;
  return (
    <div className="flex flex-col gap-1">
      <Text className="">{target.txnUsdt}</Text>
      <Text className="">{target.txnAmount}</Text>
    </div>
  );
}

function PaymentCategory(props: { target: DepositReportListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.categoryName}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.categoryName}
      </p>
    </Tooltip>
  );
}

function AccountName(props: { target: DepositReportListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.accountName}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.accountName}
      </p>
    </Tooltip>
  );
}

function Actions(props: { target: DepositReportListData }) {
  const { target } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const time = searchParams.get('time');
  const name = searchParams.get('name');
  const categoryId = searchParams.get('categoryId');

  const handleDetailsClick = () => {
    router.push(
      `/crypto-report/${
        target.accountId
      }/${target.txnType?.toLocaleLowerCase()}?name=${name}&type=${type}&time=${time}&accountName=${
        target.accountName
      }&categoryId=${categoryId}&accountId=${target.accountId}`
    );
  };
  return (
    <Box className="">
      <Button
        size="sm"
        className="bg-surface-link"
        onClick={handleDetailsClick}
      >
        Transactions
      </Button>
    </Box>
  );
}

export const columnDefs: ColumnDef<DepositReportListData>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell({ row }) {
      return <PaymentImage target={row.original} />;
    },
  },
  {
    accessorKey: 'category',
    header: 'Payment Category',
    cell({ row }) {
      return <PaymentCategory target={row.original} />;
    },
  },
  {
    accessorKey: 'accountName',
    header: 'Account Name',
    cell({ row }) {
      return <AccountName target={row.original} />;
    },
  },
  {
    accessorKey: 'paymentInfo',
    header: 'Payment Info',
    cell({ row }) {
      return <PaymentInfo target={row.original} />;
    },
  },
  {
    accessorKey: 'txnType',
    header: 'TXN Type',
  },
  {
    accessorKey: 'txnCount',
    header: 'TXN Counts',
    cell({ row }) {
      return <TXNCounts target={row.original} />;
    },
  },
  {
    accessorKey: 'txnAmount',
    header: 'TXN Amount',
    cell({ row }) {
      return <TXNAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
