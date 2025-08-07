'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text } from '@radix-ui/themes';
import { ContactFormDialog } from './ContactFormDialog';
import { SettingContactListData } from '../../../../../../../types/settings-contact.types';
import { ContactSettingsDeleteDialog } from './ContactSettingDeleteDialog';
import EditButton from '../../../../../../shared/buttons/EditButton';
import DeleteButton from '../../../../../../shared/buttons/DeleteButton';

function IsPublish(props: { target: SettingContactListData }) {
  const { target } = props;
  return <Text className="text-xs">{target.isPublish ? 'Yes' : 'No'}</Text>;
}

function Actions(props: { target: SettingContactListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  return (
    <Flex align={'center'} className="gap-x-2">
      <EditButton
        size="sm"
        variant="success"
        onClick={() => setEditModalOpen(true)}
      />
      <DeleteButton size="sm" onClick={() => setDeleteModalOpen(true)} />
      {editModalOpen && (
        <ContactFormDialog
          data={target}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Phone/ Email"
          yesLabel="Update"
          noLabel="Cancel"
        />
      )}
      {deleteModalOpen && (
        <ContactSettingsDeleteDialog
          id={target.id}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<SettingContactListData>[] = [
  {
    accessorKey: 'supportType',
    header: 'Support Type',
  },
  {
    accessorKey: 'address',
    header: 'Number/ Address',
  },
  {
    accessorKey: 'isPublish',
    header: 'Is Publish?',
    cell({ row }) {
      return <IsPublish target={row.original} />;
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
