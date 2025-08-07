'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import dayjs from '../../../../../../utils/dayjs';
import { PaymentTypeListData } from '../../../../../../types/payment-type.types';

function Name(props: { target: PaymentTypeListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.name}
      </p>
    </Tooltip>
  );
}

function AcceptedCurrency(props: { target: PaymentTypeListData }) {
  const { target } = props;

  return (
    <Flex className="gap-2" direction={'row'} justify={'start'}>
      <Text> {target?.isCrypto ? 'Crypto' : 'Fiat'} </Text>
      {target?.useNetwork && (
        <div className="text-surface-brand bg-surface-brandLight rounded-[12px] px-1">
          {' '}
          Crypto Network{' '}
        </div>
      )}
    </Flex>
  );
}

function CreatedAt(props: { target: PaymentTypeListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2 w-32 min-w-32">
      <Text className="font-medium">
        {dayjs(target?.createdAt).format('DD MMM YYYY, h:mm A')}
      </Text>
    </Flex>
  );
}

function CreatedBy(props: { target: PaymentTypeListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2">
      <Tooltip content={target?.createdBy?.name}>
        <p className="font-medium w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.createdBy?.name}
        </p>
      </Tooltip>
    </Flex>
  );
}

export const columnDefs: ColumnDef<PaymentTypeListData>[] = [
  {
    accessorKey: 'id',
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Type',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    accessorKey: 'isCrypto',
    header: 'Accepted Currency',
    cell({ row }) {
      return <AcceptedCurrency target={row.original} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell({ row }) {
      return <CreatedAt target={row.original} />;
    },
  },
  {
    accessorKey: 'createdBy',
    header: 'Created by',
    cell({ row }) {
      return <CreatedBy target={row.original} />;
    },
  },
];
