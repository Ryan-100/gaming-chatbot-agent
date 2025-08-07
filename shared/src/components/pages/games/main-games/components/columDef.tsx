'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Flex, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { MainGameListData } from '../../../../../types/main-games.types';
import EditButton from '../../../../shared/buttons/EditButton';
import MainGameEditModal from './MainGameEditModal';
import { useGetLanguageQuery } from '../../../../../stores/reducers/language.reducer';

function Name(props: { target: MainGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.game_name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.game_name}
      </p>
    </Tooltip>
  );
}

function Status(props: { target: MainGameListData }) {
  const { target } = props;
  return <Text className="">{target.is_active ? 'Active' : 'Inactive'}</Text>;
}

function GameActions(props: { target: MainGameListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { data: languageData, isLoading: languageLoading } =
    useGetLanguageQuery();
  return (
    <Flex align={'center'} className="gap-2">
      <Link href={`/main-games/${target.id}?name=${target.game_name}`}>
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
        <MainGameEditModal
          languageData={languageData?.body?.data ?? []}
          data={target}
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<MainGameListData>[] = [
  {
    header: 'Sorting No',
    cell: ({ row }) => {
      return <Text>{row.original.sorting}</Text>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Main Game ',
    cell({ row }) {
      return <Name target={row.original} />;
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
