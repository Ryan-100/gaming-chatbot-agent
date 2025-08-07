'use client';
import React from 'react';
import dayjs from '../../../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { Image } from '../../../../../../ui/image';
import { CurrencyFormat } from '../../../../../../../../src/utils';
import { TransactionByPlayerListData } from '../../../../../../../types/transaction-by-player.types';

function Amount(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.amount)}</Text>;
}

function PaymentAndType(props: { target: TransactionByPlayerListData }) {
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
        <Tooltip content={target?.PaymentCategory?.accountType}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target?.PaymentCategory?.accountType}
          </p>
        </Tooltip>
        <Text>{target.type}</Text>
      </Box>
    </Flex>
  );
}

function AccountNumber(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target?.PaymentAccount?.accountNumber}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target?.PaymentAccount?.accountNumber}
      </p>
    </Tooltip>
  );
}

function CreatedAt(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function UpdatedAt(props: { target: TransactionByPlayerListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.updatedAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

export const columnDefs: ColumnDef<TransactionByPlayerListData>[] = [
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    accessorKey: 'type',
    header: 'Payment/Type',
    cell({ row }) {
      return <PaymentAndType target={row.original} />;
    },
  },
  {
    accessorKey: 'accountNumber',
    header: 'Number',
    cell({ row }) {
      return <AccountNumber target={row.original} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date & Time',
    cell({ row }) {
      return <CreatedAt target={row.original} />;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated Date & Time',
    cell({ row }) {
      return <UpdatedAt target={row.original} />;
    },
  },
];
