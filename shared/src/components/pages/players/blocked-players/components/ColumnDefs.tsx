'use client';
import React from 'react';
import Link from 'next/link';
import dayjs from '../../../../../utils/dayjs';
import { toast } from 'sonner';
import { Box, Text, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../ui/button';
import { UserBlockDialog } from '../../../../shared/dialog/UserBlockDialog';
import { UserUnblockDialog } from '../../../../shared/dialog/UserUnblockDialog';
import { PlayerListData } from '../../../../../types/player.types';
import {
  useBlockPlayerMutation,
  useUnblockPlayerMutation,
} from '../../../../../stores/reducers/player.reducer';

function PlayerDetails(props: { target: PlayerListData }) {
  const { target } = props;
  return (
    <Link
      href={`/players/${target?.id}?name=${target?.name}&route=BLOCKED`}
      className="hover:underline"
    >
      <Tooltip content={target?.name}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.name}
        </p>
      </Tooltip>
    </Link>
  );
}

function Status(props: { target: PlayerListData }) {
  const { target } = props;
  return (
    <Text className="capitalize">
      {target?.activeStatus.toLocaleLowerCase()}
    </Text>
  );
}

function Email(props: { target: PlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target?.email}>
      <p className="min-w-32 max-w-40 truncate">{target?.email}</p>
    </Tooltip>
  );
}

function RegisteredDate(props: { target: PlayerListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target?.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function LastLoginDate(props: { target: PlayerListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target?.lastLoginDate).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function BlockedReason(props: { target: PlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target?.PlayerBlock[0]?.reason}>
      <p className="min-w-32 max-w-40 truncate">
        {target?.PlayerBlock[0]?.reason}
      </p>
    </Tooltip>
  );
}

function Actions(props: { target: PlayerListData }) {
  const { target } = props;
  const [unblockModalOpen, setUnblockModalOpen] = React.useState(false);
  const [blockModalOpen, setBlockModalOpen] = React.useState(false);

  const [blockAction, { isLoading: isBlocking }] = useBlockPlayerMutation();
  const [unblockAction, { isLoading: isUnblocking }] =
    useUnblockPlayerMutation();

  const blockHandler = async (reason: string) => {
    try {
      const response = await blockAction({
        id: target?.id,
        data: { reason: reason },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        setBlockModalOpen(false);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unblockHandler = async () => {
    try {
      const response = await unblockAction({
        id: target?.id,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        setUnblockModalOpen(false);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box>
      {target?.PlayerStatus === 'ACTIVE' ? (
        <Button
          size="sm"
          className="max-w-16"
          variant="outline"
          onClick={() => setBlockModalOpen(true)}
        >
          Block
        </Button>
      ) : (
        <Button
          size="sm"
          className="max-w-16"
          onClick={() => setUnblockModalOpen(true)}
        >
          Unblock
        </Button>
      )}
      {unblockModalOpen && (
        <UserUnblockDialog
          title="Unblock?"
          message="Are you sure you want to unblock this player?"
          open={unblockModalOpen}
          onClose={() => setUnblockModalOpen(false)}
          onSubmit={unblockHandler}
          isLoading={isUnblocking}
        />
      )}
      {blockModalOpen && (
        <UserBlockDialog
          title="Block?"
          message="Are you sure you want to block this player?"
          open={blockModalOpen}
          onClose={() => setBlockModalOpen(false)}
          onSubmit={blockHandler}
          isLoading={isBlocking}
        />
      )}
    </Box>
  );
}

export const columnDefs: ColumnDef<PlayerListData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <PlayerDetails target={row.original} />;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell({ row }) {
      return <Email target={row.original} />;
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  {
    accessorKey: 'lastActive',
    header: 'Last Active on',
    cell({ row }) {
      return <LastLoginDate target={row.original} />;
    },
  },
  {
    accessorKey: 'registeredDate',
    header: 'Registered Date',
    cell({ row }) {
      return <RegisteredDate target={row.original} />;
    },
  },
  {
    accessorKey: 'PlayerBlock[0].reason',
    header: 'Block Reason',
    cell({ row }) {
      return <BlockedReason target={row.original} />;
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
