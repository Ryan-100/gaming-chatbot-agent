'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { formatNumber } from '../../../../../utils/formatNumber';
import { PocketMoneyTransactionListData } from '../../../../../types/pocket-money.type';
import dayjs from '../../../../../utils/dayjs';

// function Player(props: { target: PocketMoneyTransactionListData }) {
//   const { target } = props;
//   return (
//     <Link
//       href={`/players/${target.id}?name=${target.Player.name}&route=ALL`}
//       className="hover:underline font-semibold"
//     >
//       {target?.Player?.name}
//     </Link>
//   );
// }

function Player(props: { target: PocketMoneyTransactionListData }) {
  const { target } = props;
  return (
    <Tooltip content={target?.Player?.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target?.Player?.name}
      </p>
    </Tooltip>
  );
}

function Amount(props: { target: PocketMoneyTransactionListData }) {
  const { target } = props;
  return <Text>{formatNumber(target?.bonusAmount)}</Text>;
}

export const columnDefs: ColumnDef<PocketMoneyTransactionListData>[] = [
  {
    accessorKey: 'id',
    header: 'No.',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <Player target={row.original} />;
    },
  },
  {
    accessorKey: 'level',
    header: 'Level',
    cell: ({ row }) => row?.original?.Player?.PlayerLevel?.name || '-',
  },
  {
    accessorKey: 'amount',
    header: 'Claimed Value',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    accessorKey: 'date',
    header: 'Claimed on',
    cell: ({ row }) => (
      <p className="w-32 min-w-32">
        {dayjs(row?.original?.createdAt).format('MMM DD, YYYY, h:mm A')}
      </p>
    ),
  },
];

//not added
