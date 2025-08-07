'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Flex, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import EditButton from '../../../../shared/buttons/EditButton';
import { ChildGameListData } from '../../../../../types/child-games.types';
import ChildGameEditModal from '../details/components/ChildGameEditModal';

function ChildGameName(props: { target: ChildGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.game_name_en}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.game_name_en}
      </p>
    </Tooltip>
  );
}

function MainGameName(props: { target: ChildGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.mainGames.game_name}>
      <Link
        href={`main-games/${target?.mainGames?.id}?name=${target.mainGames.game_name}`}
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.mainGames.game_name}
        </p>
      </Link>
    </Tooltip>
  );
}

function Status(props: { target: ChildGameListData }) {
  const { target } = props;
  return <Text className="">{target.is_active ? 'Active' : 'Inactive'}</Text>;
}

function GameActions(props: { target: ChildGameListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <Flex className="gap-2">
      <Link href={`/child-games/${target.id}?name=${target.game_name_en}`}>
        <Button size="sm" className="bg-surface-link">
          Details
        </Button>
      </Link>
      <EditButton
        size="sm"
        onClick={() => setEditModalOpen(true)}
        className="bg-surface-success"
      />
      {editModalOpen && (
        <ChildGameEditModal
          data={target}
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<ChildGameListData>[] = [
  {
    header: 'Sorting No',
    cell: ({ row }) => {
      return <Text>{row.original.sorting}</Text>;
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
    accessorKey: 'status',
    header: 'Status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
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
