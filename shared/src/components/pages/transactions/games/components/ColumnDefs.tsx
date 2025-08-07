'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { TransactionGameListData } from '../../../../../types/transaction-games.types';
import dayjs from '../../../../../utils/dayjs';
import Link from 'next/link';

function Player(props: { target: TransactionGameListData }) {
  const { target } = props;
  return (
    <Flex
      direction={'column'}
      className="gap-1 w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate"
    >
      <Link
        href={`/players/${target.user_id}?name=${target.users.name}&route=ALL`}
      >
        <Tooltip content={target.users.name}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate font-semibold hover:underline">
            {target.users.name}
          </p>
        </Tooltip>
      </Link>
      <Text>{target.users.player_code ?? ''}</Text>
    </Flex>
  );
}

function Game(props: { target: TransactionGameListData }) {
  const { target } = props;
  return (
    <Box className="!flex flex-col space-y-2">
      <Text className="font-semibold">{target.mainGames.game_name}</Text>
      <Text>{target.childGames.game_name_en}</Text>
    </Box>
  );
}

function Amount(props: { target: TransactionGameListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target.win_value)}</Text>;
}

function GameAmount(props: { target: TransactionGameListData }) {
  const { target } = props;
  return (
    <Text className="text-text-error">{CurrencyFormat(target.lose_value)}</Text>
  );
}

function ProcessState(props: { target: TransactionGameListData }) {
  const { target } = props;
  return (
    <Text className="text-text-error bg-surface-brandLight px-2 rounded-[10px] capitalize">
      {target.game_status.toLocaleLowerCase()}
    </Text>
  );
}

function RequestedOn(props: { target: TransactionGameListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.created_at).format('MMM DD, YYYY h:mm A')}
    </p>
  );
}

function UpdatedOn(props: { target: TransactionGameListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.updated_at).format('MMM DD, YYYY h:mm A')}
    </p>
  );
}

export const columnDefs: ColumnDef<TransactionGameListData>[] = [
  {
    accessorKey: 'name',
    header: 'Player',
    cell({ row }) {
      return <Player target={row.original} />;
    },
  },
  {
    accessorKey: 'promocode&created',
    header: 'Game',
    cell({ row }) {
      return <Game target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Win Amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Lose Amount',
    cell({ row }) {
      return <GameAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Process State',
    cell({ row }) {
      return <ProcessState target={row.original} />;
    },
  },
  {
    accessorKey: 'requestedOn',
    header: 'Requested On',
    cell({ row }) {
      return <RequestedOn target={row.original} />;
    },
  },
  {
    accessorKey: 'updatedOn',
    header: 'Updated On',
    cell({ row }) {
      return <UpdatedOn target={row.original} />;
    },
  },
];

//not added
