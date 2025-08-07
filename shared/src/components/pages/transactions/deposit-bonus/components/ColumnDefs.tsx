'use client';
import React from 'react';
import Link from 'next/link';
import dayjs from '../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { TransactionDepositBonusListData } from '../../../../../types/transaction-deposit-bonus.types';

function Player(props: { target: TransactionDepositBonusListData }) {
  const { target } = props;
  return (
    <Flex
      direction={'column'}
      className="gap-1 w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate"
    >
      <Link
        href={`/players/${target.Player.id}?name=${target.Player.name}&route=ALL`}
      >
        <Tooltip content={target.Player.name}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate font-semibold hover:underline">
            {target.Player.name}
          </p>
        </Tooltip>
        <Text>{target.Player.playerCode}</Text>
      </Link>
    </Flex>
  );
}

function DepositAmount(props: { target: TransactionDepositBonusListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target.depositAmount)}</Text>;
}

function BonusAmount(props: { target: TransactionDepositBonusListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target.bonusAmount)}</Text>;
}

function ClaimedOn(props: { target: TransactionDepositBonusListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

export const columnDefs: ColumnDef<TransactionDepositBonusListData>[] = [
  {
    accessorKey: 'name',
    header: 'Player',
    cell({ row }) {
      return <Player target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Deposit Amount',
    cell({ row }) {
      return <DepositAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Bonus Amount',
    cell({ row }) {
      return <BonusAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'requestedOn',
    header: 'Claimed On',
    cell({ row }) {
      return <ClaimedOn target={row.original} />;
    },
  },
];

//not added
