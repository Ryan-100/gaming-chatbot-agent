'use client';
import React from 'react';
import Link from 'next/link';
import { Flex, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../ui/button';
import EditGamePanelModal from './EditGamePanelModal';
import EditButton from '../../../shared/buttons/EditButton';
import { TrackPanelListData } from '../../../../types/track-panel.types';

function MainGameName(props: { target: TrackPanelListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.mainGames.game_name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.mainGames.game_name}
      </p>
    </Tooltip>
  );
}

function URL(props: { target: TrackPanelListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.url}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.url}
      </p>
    </Tooltip>
  );
}

function GameActions(props: { target: TrackPanelListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  return (
    <Flex className="gap-2">
      <Link href={`/game-tracking/${target.id}`}>
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
        <EditGamePanelModal
          data={target}
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<TrackPanelListData>[] = [
  {
    accessorKey: 'mainGameName',
    header: 'Main Game',
    cell({ row }) {
      return <MainGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'url',
    header: 'URL',
    cell({ row }) {
      return <URL target={row.original} />;
    },
  },
  {
    accessorKey: 'vpn_required',
    header: 'VPN Requirement',
    accessorFn: (row) => `${row.vpn_required === true ? 'Yes' : 'No'}`,
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
