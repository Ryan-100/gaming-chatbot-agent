'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { RegisterBonusListData } from '../../../../../types/bonus.types';
import { isGreaterToday } from '../../components/dayChecker';
import { cn } from '../../../../../utils/cn';

function Title(props: { target: RegisterBonusListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.bonusTitle}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.bonusTitle}
      </p>
    </Tooltip>
  );
}

function StartedExpired(props: { target: RegisterBonusListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-y-2 min-w-32">
      <Text className="text-xs">
        {dayjs(target.startDate).format('MMM DD, YYYY, h:mm A')}
      </Text>
      <Text
        className={cn(
          'text-xs',
          isGreaterToday(target.endDate)
            ? 'text-text-success'
            : 'text-text-error'
        )}
      >
        {dayjs(target.endDate).format('MMM DD, YYYY, h:mm A')}
      </Text>
    </Flex>
  );
}

function Actions(props: { target: RegisterBonusListData }) {
  const { target } = props;
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(
      `/active-bonus/register?name=${target?.bonusTitle}&id=${target.id}`
    );
  };
  return (
    <Box className="">
      <Button
        size="sm"
        className="bg-surface-link"
        onClick={handleDetailsClick}
      >
        Details
      </Button>
    </Box>
  );
}

export const activeRegisterColumnDefs: ColumnDef<RegisterBonusListData>[] = [
  {
    accessorKey: 'bonusTitle',
    header: 'Title',
    cell({ row }) {
      return <Title target={row.original} />;
    },
  },
  {
    accessorKey: 'bonusAmount',
    header: 'Amount',
  },
  {
    accessorKey: 'expiredTime',
    header: 'Expired Time',
    cell: ({ row }) =>
      `${row?.original?.expireTime} ${row?.original?.expireType}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (row.original?.bonusStatus ? 'Active' : 'Inactive'),
  },
  {
    accessorKey: 'expired_at',
    header: 'Started / Expired',
    cell({ row }) {
      return <StartedExpired target={row.original} />;
    },
  },
  {
    accessorKey: 'turnOverRate',
    header: 'Turnover Rate',
    cell: ({ row }) => `${row?.original?.turnOverRate} X`,
  },
  {
    accessorKey: 'created_at',
    header: 'Created On',
    cell: ({ row }) => (
      <Flex className="min-w-32 w-32">
        {dayjs(row?.original?.createdAt).format('MMM DD, YYYY, h:mm A')}
      </Flex>
    ),
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
