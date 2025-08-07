'use client';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Flex, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import DeleteButton from '../../../../shared/buttons/DeleteButton';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { HotGameListData } from '../../../../../types/hot-games.types';
import Link from 'next/link';
import SortHotGameDialog from './SortHotGameDialog';
import { DeleteHotGameDialog } from './DeleteHotGameDialog';
import SwapHotGameDialog from './SwapHotGameDialog';

function ChildGameName(props: { target: HotGameListData }) {
  const { target } = props;
  console.log('target', target);

  return (
    <Tooltip content={target.childGames.game_name_en}>
      <Link
        href={`child-games/${target.childGames?.id}?name=${target.childGames.game_name_en}`}
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate hover:underline">
          {target.childGames.game_name_en}
        </p>
      </Link>
    </Tooltip>
  );
}

function MainGameName(props: { target: HotGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.mainGames.game_name}>
      <Link
        href={`main-games/${target?.mainGames?.id}?name=${target.mainGames.game_name}`}
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate hover:underline">
          {target.mainGames.game_name}
        </p>
      </Link>
    </Tooltip>
  );
}

function GameActions(props: { target: HotGameListData }) {
  const { target } = props;
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <Flex className="gap-2">
        <Button
          size="sm"
          onClick={() => setSortModalOpen(true)}
          variant="success"
        >
          Sort
        </Button>
        <Button
          size="sm"
          onClick={() => setSwapModalOpen(true)}
          variant="success"
        >
          Swap
        </Button>
        <DeleteButton
          size="sm"
          onClick={() => setDeleteModalOpen(true)}
          name="Remove"
        />
      </Flex>
      {sortModalOpen && (
        <SortHotGameDialog
          data={target}
          open={sortModalOpen}
          handleClose={() => setSortModalOpen(false)}
        />
      )}
      {swapModalOpen && (
        <SwapHotGameDialog
          data={target}
          open={swapModalOpen}
          handleClose={() => setSwapModalOpen(false)}
        />
      )}
      {deleteModalOpen && (
        <DeleteHotGameDialog
          id={target.id}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </>
  );
}

export const columnDefs: ColumnDef<HotGameListData>[] = [
  {
    header: 'Sorting No',
    cell: ({ row }) => {
      return <Text>{row.original?.sorting}</Text>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Child Game Name',
    cell({ row }) {
      return <ChildGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Main Game Name',
    cell({ row }) {
      return <MainGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'totalPlayer',
    header: 'Total Player',
    cell: ({ row }) => (
      <Text> {CurrencyFormat(row.original.totalPlayerCount)}</Text>
    ),
  },
  {
    accessorKey: 'winAmount',
    header: 'Win Amount',
    cell: ({ row }) => (
      <Text> {CurrencyFormat(row.original.totalWinValue)}</Text>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <GameActions target={row.original} />;
    },
    enableHiding: false,
  },
];
