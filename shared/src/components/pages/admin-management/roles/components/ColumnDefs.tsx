'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { RoleListData } from '../../../../../types/roles.types';
import { RoleDeleteDialog } from './DeleteDialog';
import EditButton from '../../../../shared/buttons/EditButton';
import DeleteButton from '../../../../shared/buttons/DeleteButton';
import { useRouter } from 'next/navigation';
import { validRoutes } from '../../../../../data/PermissionList';
import dayjs from '../../../../../utils/dayjs';

function Name(props: { target: RoleListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.name}
      </p>
    </Tooltip>
  );
}

function CreatedAt(props: { target: RoleListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function CreatedBy(props: { target: RoleListData }) {
  const { target } = props;

  return (
    <Tooltip content={target.CreatedBy?.name ?? 'unknown'}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.CreatedBy?.name ?? 'unknown'}
      </p>
    </Tooltip>
  );
}

function Status(props: { target: RoleListData }) {
  const { target } = props;
  return (
    <Text className="capitalize">{target.status.toLocaleLowerCase()}</Text>
  );
}

function Actions(props: { target: RoleListData }) {
  const router = useRouter();
  const { target } = props;
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  return (
    <Flex align="center" className="gap-2">
      <EditButton
        size="sm"
        variant="success"
        onClick={() => router.push(`/roles/${target.id}/update`)}
        disable={target.RoleOnPermission.some((item) =>
          validRoutes.includes(item?.Permission?.route)
        )}
      />
      <DeleteButton
        size="sm"
        variant="destructive"
        onClick={() => setDeleteModalOpen(true)}
        disable={target.RoleOnPermission.some((item) =>
          validRoutes.includes(item?.Permission?.route)
        )}
      />
      {deleteModalOpen && (
        <RoleDeleteDialog
          id={target.id}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<RoleListData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created/Update',
    cell({ row }) {
      return <CreatedAt target={row.original} />;
    },
  },
  {
    accessorKey: 'createdBy',
    header: 'Created/Update by',
    cell({ row }) {
      return <CreatedBy target={row.original} />;
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
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
