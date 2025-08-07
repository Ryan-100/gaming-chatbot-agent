import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { CryptoNetworkListData } from '../../../../../../types/crypto-network.types';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import dayjs from '../../../../../../utils/dayjs';
import { Button } from '../../../../../ui/button';
import CryptoNetworkFormDialog from './CryptoNetworkFormDialog';

function Name(props: { target: CryptoNetworkListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.name}
      </p>
    </Tooltip>
  );
}

function CreatedAt(props: { target: CryptoNetworkListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2 w-32 min-w-32">
      <Text className="font-medium">
        {dayjs(target?.createdAt).format('DD MMM YYYY, h:mm A')}
      </Text>
      <Text className="font-medium">
        {dayjs(target?.updatedAt).format('DD MMM YYYY, h:mm A') || '-'}
      </Text>
    </Flex>
  );
}

function CreatedBy(props: { target: CryptoNetworkListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2">
      <Tooltip content={target?.CreatedBy?.name}>
        <p className="font-medium w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.CreatedBy?.name}
        </p>
      </Tooltip>
      <Tooltip content={target?.UpdatedBy?.name || '-'}>
        <p className="font-medium w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.UpdatedBy?.name || '-'}
        </p>
      </Tooltip>
    </Flex>
  );
}

function Actions(props: { target: CryptoNetworkListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  return (
    <Flex align="center" className="gap-2">
      <Button
        size="sm"
        variant="success"
        onClick={() => setEditModalOpen(true)}
      >
        Edit
      </Button>
      {editModalOpen && (
        <CryptoNetworkFormDialog
          data={target}
          title="Type"
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          yesLabel="Update"
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<CryptoNetworkListData>[] = [
  {
    accessorKey: 'id',
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Network Name',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    accessorKey: 'requireMemo',
    header: 'Require MEMO',
    cell: ({ row }) => (row.original.requireMemo === true ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created/Updated',
    cell({ row }) {
      return <CreatedAt target={row.original} />;
    },
  },
  {
    accessorKey: 'createdBy',
    header: 'Created/Updated by',
    cell({ row }) {
      return <CreatedBy target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
