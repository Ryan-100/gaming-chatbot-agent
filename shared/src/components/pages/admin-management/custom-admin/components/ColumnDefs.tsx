'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import EditButton from '../../../../shared/buttons/EditButton';
import { Button } from '../../../../ui/button';
import { CustomAdminListData } from '../../../../../types/custom-admin.types';
import { UpdateCustomAdminFormDialog } from './UpdateCustomAdminFormDialog';
import { ChangeAdminStatusDialog } from './ChangeAdminStatusDialog';
import { AdminDetailsDialog } from './AdminDetailDialog';

function Name(props: { target: CustomAdminListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.name}
      </p>
    </Tooltip>
  );
}

function Status(props: { target: CustomAdminListData }) {
  const { target } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <Text
        className="capitalize cursor-pointer hover:underline"
        onClick={() => setModalOpen(true)}
      >
        {target.AdminStatus.toLocaleLowerCase()}
      </Text>
      {modalOpen && (
        <ChangeAdminStatusDialog
          id={target.id}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

function Actions(props: { target: CustomAdminListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  return (
    <Flex align={'center'} className="gap-2">
      <EditButton
        size="sm"
        variant="success"
        onClick={() => setEditModalOpen(true)}
      />
      <Button
        size={'sm'}
        className="bg-surface-link"
        onClick={() => setDetailModalOpen(true)}
      >
        Details
      </Button>
      {editModalOpen && (
        <UpdateCustomAdminFormDialog
          data={target}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      {detailModalOpen && (
        <AdminDetailsDialog
          id={target.id}
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<CustomAdminListData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    accessorKey: 'agentCode',
    header: 'Login ID',
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
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
