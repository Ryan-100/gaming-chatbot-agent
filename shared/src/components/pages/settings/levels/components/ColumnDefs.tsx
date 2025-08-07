'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { LevelsFormDialog } from './LevelsFormDialog';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { SettingsDeleteDialog } from '../../components/SettingsDeleteDialog';
import { PlayerLevelListData } from '../../../../../types/player-level.types';
import { useDeletePlayerLevelMutation } from '../../../../../stores/reducers/player-level.reducer';
import { toast } from 'sonner';
import EditButton from '../../../../shared/buttons/EditButton';
import DeleteButton from '../../../../shared/buttons/DeleteButton';

function LevelImage(props: { target: PlayerLevelListData }) {
  const { target } = props;
  return (
    <Box>
      <img
        src={target.Image.url}
        alt="Level Icon"
        width={50}
        height={34.6}
        className="object-cover"
      />
    </Box>
  );
}

function Name(props: { target: PlayerLevelListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.name}
      </p>
    </Tooltip>
  );
}

function Rank(props: { target: PlayerLevelListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.rank}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.rank}
      </p>
    </Tooltip>
  );
}

function MinDeposit(props: { target: PlayerLevelListData }) {
  const { target } = props;
  return <Text className="text-xs">{CurrencyFormat(target.minDeposit)}</Text>;
}

function Description(props: { target: PlayerLevelListData }) {
  const { target } = props;
  return (
    <div
      className="text-xs whitespace-normal break-words max-w-40"
      dangerouslySetInnerHTML={{
        __html: target.description,
      }}
    ></div>
  );
}

function Actions(props: { target: PlayerLevelListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [deletePlayerLevel] = useDeletePlayerLevelMutation();

  const handleDelete = async () => {
    try {
      const response = await deletePlayerLevel({
        id: target.id,
      });
      if (response.data?.meta?.success) {
        toast('Successfully updated player level');
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setDeleteModalOpen(false);
  };

  return (
    <Flex align={'center'} className="gap-x-2">
      <EditButton
        size="sm"
        variant="success"
        onClick={() => setEditModalOpen(true)}
      />
      <DeleteButton size="sm" onClick={() => setDeleteModalOpen(true)} />
      {editModalOpen && (
        <LevelsFormDialog
          data={target}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Level"
          yesLabel="Update"
          noLabel="Cancel"
        />
      )}
      {deleteModalOpen && (
        <SettingsDeleteDialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<PlayerLevelListData>[] = [
  {
    accessorKey: 'order',
    header: 'Order',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    accessorKey: 'rank',
    header: 'Rank',
    cell({ row }) {
      return <Rank target={row.original} />;
    },
  },
  {
    accessorKey: 'min_deposit',
    header: 'Min Deposit',
    cell({ row }) {
      return <MinDeposit target={row.original} />;
    },
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell({ row }) {
      return <LevelImage target={row.original} />;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell({ row }) {
      return <Description target={row.original} />;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
