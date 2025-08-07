'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { Image } from '../../../../ui/image';
import { Button } from '../../../../ui/button';
import { CurrencyFormat } from '../../../../../../src/utils';
import { TransactionsWithdrawListData } from '../../../../../types/transactions-withdraw.types';

function PaymentAccount(props: { target: TransactionsWithdrawListData }) {
  const { target } = props;
  return (
    <Flex align="center" className="gap-x-2">
      {target.PaymentCategory.File?.url ? (
        <Image
          src={target.PaymentCategory.File?.url}
          alt="payment type"
          width={32}
          height={32}
          className="rounded-[10px] w-8 h-8 object-cover"
        />
      ) : (
        <Text>-</Text>
      )}
      <Box className="!flex flex-col gap-y-2">
        <Tooltip content={target.Player.PlayerPaymentAccount.accountnumber}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target.Player.PlayerPaymentAccount.accountnumber}
          </p>
        </Tooltip>
        <Tooltip content={target.Player.PlayerPaymentAccount.accountName}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target.Player.PlayerPaymentAccount.accountName}
          </p>
        </Tooltip>
      </Box>
    </Flex>
  );
}

function Amount(props: { target: TransactionsWithdrawListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target.amount)}</Text>;
}

function USDTAmount(props: { target: TransactionsWithdrawListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target.receiveableAmount)}</Text>;
}

function DateTime(props: { target: TransactionsWithdrawListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function Actions(props: { target: TransactionsWithdrawListData }) {
  const { target } = props;
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/withdraw-rejected/${target.id}`);
  };
  return (
    <Box className="">
      <Button
        size="sm"
        className="bg-surface-link"
        onClick={handleDetailsClick}
      >
        Details
      </Button>
    </Box>
  );
}

export const columnDefs: ColumnDef<TransactionsWithdrawListData>[] = [
  {
    accessorKey: 'account',
    header: 'Payment Account',
    cell({ row }) {
      return <PaymentAccount target={row.original} />;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Withdraw Amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    accessorKey: 'requestedOn',
    header: 'Requested Date & Time',
    cell({ row }) {
      return <DateTime target={row.original} />;
    },
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];

export const cryptoAdminColumnDefs: ColumnDef<TransactionsWithdrawListData>[] =
  [
    {
      accessorKey: 'account',
      header: 'Payment Account',
      cell({ row }) {
        return <PaymentAccount target={row.original} />;
      },
    },
    {
      accessorKey: 'amount',
      header: 'Withdraw Amount',
      cell({ row }) {
        return <Amount target={row.original} />;
      },
    },
    {
      accessorKey: 'receiveableAmount',
      header: 'Withdraw USDT Amount',
      cell({ row }) {
        return <USDTAmount target={row.original} />;
      },
    },
    {
      accessorKey: 'requestedOn',
      header: 'Requested Date & Time',
      cell({ row }) {
        return <DateTime target={row.original} />;
      },
    },
    {
      accessorKey: 'action',
      header: 'Actions',
      cell({ row }) {
        return <Actions target={row.original} />;
      },
    },
  ];
