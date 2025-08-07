'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { SameIpUsersByPlayerListData } from '../../../../../../../types/same-ip-users.types';

function User(props: { target: SameIpUsersByPlayerListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2">
      <Tooltip content={target.Player.name}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.Player.name}
        </p>
      </Tooltip>
      <Text>{target.Player.playerId}</Text>
    </Flex>
  );
}

export const columnDefs: ColumnDef<SameIpUsersByPlayerListData>[] = [
  {
    accessorKey: 'player',
    header: 'User',
    cell({ row }) {
      return <User target={row.original} />;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'ipAddress',
    header: 'IP Address',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'device',
    header: 'Device Info',
  },
];
