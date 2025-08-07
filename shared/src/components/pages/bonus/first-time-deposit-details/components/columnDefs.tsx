'use client';
import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { FirstTimeDepositBonusDetailsListData } from '../../../../../types/bonus.types';
import dayjs from '../../../../../utils/dayjs';

function Player(props: { target: FirstTimeDepositBonusDetailsListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-y-2">
      <Link
        href={`/players/${target.id}?name=${target.Player.name}&route=ALL`}
        className="hover:underline font-semibold max-w-24"
      >
        <Tooltip content={target.Player.name}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target.Player.name}
          </p>
        </Tooltip>
      </Link>
      <Text>{target?.Player.playerCode}</Text>
    </Flex>
  );
}

function DepositAmount(props: {
  target: FirstTimeDepositBonusDetailsListData;
}) {
  const { target } = props;
  return <Text>{CurrencyFormat(target?.depositAmount)}</Text>;
}

function BonusAmount(props: { target: FirstTimeDepositBonusDetailsListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target?.bonusAmount)}</Text>;
}

export const firstTimeDepositBonusDetailsColumnDefs: ColumnDef<FirstTimeDepositBonusDetailsListData>[] =
  [
    {
      accessorKey: 'id',
      header: 'No.',
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'player',
      header: 'Player',
      cell({ row }) {
        return <Player target={row.original} />;
      },
    },
    {
      accessorKey: 'deposit_amount',
      header: 'Deposit Amount',
      cell({ row }) {
        return <DepositAmount target={row.original} />;
      },
    },
    {
      accessorKey: 'bonus_amount',
      header: 'Bonus Amount',
      cell({ row }) {
        return <BonusAmount target={row.original} />;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Claimed On',
      cell: ({ row }) => (
        <Flex className="min-w-32 w-32">
          {dayjs(row?.original?.createdAt).format('MMM DD, YYYY, h:mm A')}
        </Flex>
      ),
    },
  ];
