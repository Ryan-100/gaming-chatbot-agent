'use client';
import React from 'react';
import dayjs from '../../../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../../../utils/currencyFormat';
import { GameActivityByPlayerListData } from '../../../../../../../types/game-activity.types';

function ChildGameName(props: { target: GameActivityByPlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.game}>
      <p className="w-fit max-w-[100px] lg:max-w-36 xl:max-w-60 truncate">
        {target.game}
      </p>
    </Tooltip>
  );
}

function MainGameName(props: { target: GameActivityByPlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.main_game}>
      <p className="w-fit max-w-[100px] lg:max-w-36 xl:max-w-60 truncate">
        {target.main_game}
      </p>
    </Tooltip>
  );
}

function WinValue(props: { target: GameActivityByPlayerListData }) {
  const { target } = props;
  return (
    <Text className="text-text-success">
      {CurrencyFormat(target.win_value)}
    </Text>
  );
}

function LoseValue(props: { target: GameActivityByPlayerListData }) {
  const { target } = props;
  return (
    <Text className="text-text-error">{CurrencyFormat(target.lose_value)}</Text>
  );
}

function ExitedOn(props: { target: GameActivityByPlayerListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.exited_on).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function StartedOn(props: { target: GameActivityByPlayerListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.started_on).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

export const columnDefs: ColumnDef<GameActivityByPlayerListData>[] = [
  {
    accessorKey: 'id',
    header: 'No.',
    cell({ row }) {
      return <Text>{row.index + 1}</Text>;
    },
  },
  {
    accessorKey: 'game',
    header: 'Game',
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
    header: 'Win Amount',
    cell({ row }) {
      return <WinValue target={row.original} />;
    },
  },
  {
    header: 'Lose Amount',
    cell({ row }) {
      return <LoseValue target={row.original} />;
    },
  },
  {
    accessorKey: 'startedOn',
    header: 'Started on',
    cell({ row }) {
      return <StartedOn target={row.original} />;
    },
  },
  {
    accessorKey: 'exitedOn',
    header: 'Exited on',
    cell({ row }) {
      return <ExitedOn target={row.original} />;
    },
  },
];
