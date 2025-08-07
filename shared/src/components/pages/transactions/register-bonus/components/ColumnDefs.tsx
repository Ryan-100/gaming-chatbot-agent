'use client';
import React from 'react';
import Link from 'next/link';
import dayjs from '../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { TransactionRegisterBonusListData } from '../../../../../types/transaction-register-bonus.types';

function Description(props: { target: TransactionRegisterBonusListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.RegisterBonus.bonusTitle}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.RegisterBonus.bonusTitle}
      </p>
    </Tooltip>
  );
}

function Player(props: { target: TransactionRegisterBonusListData }) {
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

function RegisterBonus(props: { target: TransactionRegisterBonusListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target.bonusAmount)}</Text>;
}

function LeftAmount(props: { target: TransactionRegisterBonusListData }) {
  const { target } = props;
  return <Text>{CurrencyFormat(target.bonusLeftAmount)}</Text>;
}

function RegisteredOn(props: { target: TransactionRegisterBonusListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

export const columnDefs: ColumnDef<TransactionRegisterBonusListData>[] = [
  {
    accessorKey: 'description',
    header: 'Description',
    cell({ row }) {
      return <Description target={row.original} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Player',
    cell({ row }) {
      return <Player target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Register Bonus',
    cell({ row }) {
      return <RegisterBonus target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Left Amount',
    cell({ row }) {
      return <LeftAmount target={row.original} />;
    },
  },
  {
    accessorKey: 'requestedOn',
    header: 'Registered On',
    cell({ row }) {
      return <RegisteredOn target={row.original} />;
    },
  },
];

//not added
