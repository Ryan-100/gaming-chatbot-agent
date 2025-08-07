'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Image } from '../../../../../../ui/image';
import { EditSocialFormDialog } from './EditSocialFormDialog';
import { SettingSocialMediaListData } from '../../../../../../../types//settings-social-media.types';
import { SocialMediaSettingsDeleteDialog } from './SocialMediaSettingDeleteDialog';
import EditButton from '../../../../../../shared/buttons/EditButton';
import DeleteButton from '../../../../../../shared/buttons/DeleteButton';

function SocialApp(props: { target: SettingSocialMediaListData }) {
  const { target } = props;
  return (
    <Box>
      {target.AppLogo.url && (
        <Image
          src={target.AppLogo.url}
          alt="Social App"
          width={20}
          height={20}
          className="object-cover rounded-full"
        />
      )}
    </Box>
  );
}

function IsPublish(props: { target: SettingSocialMediaListData }) {
  const { target } = props;
  return <Text className="text-xs">{target.isPublish ? 'Yes' : 'No'}</Text>;
}

function Actions(props: { target: SettingSocialMediaListData }) {
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
        <EditSocialFormDialog
          data={target}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      {deleteModalOpen && (
        <SocialMediaSettingsDeleteDialog
          id={target.id}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<SettingSocialMediaListData>[] = [
  {
    accessorKey: 'appLogo',
    header: 'Social App',
    cell({ row }) {
      return <SocialApp target={row.original} />;
    },
  },
  {
    accessorKey: 'link',
    header: 'Link',
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
