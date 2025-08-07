'use client';
import React from 'react';
import Link from 'next/link';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { TopWinningPlayerListData } from '../../../../../types/top-winning-players.types';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import dayjs from '../../../../../utils/dayjs';

function PlayerDetails(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Link
      href={`/players/${target?.users?.id}?name=${target?.users?.name}`}
      className="hover:underline"
    >
      <Tooltip content={target?.users?.name}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.users?.name}
        </p>
      </Tooltip>
    </Link>
  );
}

function ChildGameName(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target?.childGames?.game_name_en}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target?.childGames?.game_name_en}
      </p>
    </Tooltip>
  );
}

function MainGameName(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target?.mainGames?.game_name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target?.mainGames?.game_name}
      </p>
    </Tooltip>
  );
}

function PlayerPhoneAndRegisteredDate(props: {
  target: TopWinningPlayerListData;
}) {
  const { target } = props;
  return (
    <Flex direction="column" className="text-xs">
      <Text className="font-semibold">
        {target?.users?.phone ?? target?.users?.email}
      </Text>
      <p className="w-32 min-w-32">
        {dayjs(target?.users?.created_at).format('DD MMM YYYY, h:mm A')}
      </p>
    </Flex>
  );
}

function Amount(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Flex direction={'column'} className="gap-2">
      <Text>{CurrencyFormat(parseInt(target?.win_value))}</Text>
    </Flex>
  );
}

export const columnDefs: ColumnDef<TopWinningPlayerListData>[] = [
  {
    accessorKey: 'id',
    header: 'No.',
    cell: ({ row }) => {
      return <Text>{row.index + 1}</Text>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <PlayerDetails target={row.original} />;
    },
  },
  {
    accessorKey: 'phone&registeredDate',
    header: 'Contact & Registered Date',
    cell({ row }) {
      return <PlayerPhoneAndRegisteredDate target={row.original} />;
    },
  },
  {
    accessorKey: 'game',
    header: 'Game Name',
    cell({ row }) {
      return <ChildGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'mainGame',
    header: 'Main Game',
    cell({ row }) {
      return <MainGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Win Amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
];
