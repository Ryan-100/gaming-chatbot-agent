'use client';
import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { RegisterBonusDetailsListData } from '../../../../../types/bonus.types';
import dayjs from '../../../../../utils/dayjs';

function Player(props: { target: RegisterBonusDetailsListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-y-2">
      <Link
        href={`/players/${target.id}?name=${target.Player.name}&route=ALL`}
        className="hover:underline font-semibold"
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

function RegisterAmount(props: { target: RegisterBonusDetailsListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target?.bonusAmount)}</Text>;
}

// function LastAmount(props: { target: RegisterBonusDetailsListData }) {
//   const { target } = props;
//   return <Text>{CurrencyFormat(target.last_amount)}</Text>;
// }

export const registerBonusDetailsColumnDefs: ColumnDef<RegisterBonusDetailsListData>[] =
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
      accessorKey: 'register_amount',
      header: 'Register Bonus',
      cell({ row }) {
        return <RegisterAmount target={row.original} />;
      },
    },
    // {
    //   accessorKey: 'last_amount',
    //   header: 'Last Amount',
    //   cell({ row }) {
    //     return <LastAmount target={row.original} />;
    //   },
    // },
    {
      accessorKey: 'createdAt',
      header: 'Registered On',
      cell: ({ row }) => (
        <Flex className="min-w-32 w-32">
          {dayjs(row?.original?.createdAt).format('MMM DD, YYYY, h:mm A')}
        </Flex>
      ),
    },
  ];
