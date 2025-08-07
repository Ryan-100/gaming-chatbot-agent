'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { DepositBonusListData } from '../../../../../types/bonus.types';
import { isGreaterToday } from '../../components/dayChecker';
import { cn } from '../../../../../utils/cn';
import { CurrencyFormat } from '../../../../../../src/utils/currencyFormat';

function Title(props: { target: DepositBonusListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.bonusTitle}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.bonusTitle}
      </p>
    </Tooltip>
  );
}

function StartedExpired(props: { target: DepositBonusListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-y-2 w-36 min-w-36">
      <p className="text-xs w-36 min-w-36">
        {dayjs(target.startDate).format('MMM DD, YYYY, h:mm A')}
      </p>
      <p
        className={cn(
          'text-xs w-36 min-w-36',
          isGreaterToday(target.endDate)
            ? 'text-text-success'
            : 'text-text-error'
        )}
      >
        {dayjs(target.endDate).format('MMM DD, YYYY, h:mm A')}
      </p>
    </Flex>
  );
}

function Actions(props: { target: DepositBonusListData }) {
  const { target } = props;
  const router = useRouter();

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleDetailsClick = () => {
    router.push(
      `/deposit-bonus/details?name=${target?.bonusTitle}&id=${target.id}`
    );
  };
  return (
    <Flex align={'center'} className="gap-2">
      <Button
        size="sm"
        className="bg-surface-link"
        onClick={handleDetailsClick}
      >
        Details
      </Button>
    </Flex>
  );
}

export const expiredColumnDefs: ColumnDef<DepositBonusListData>[] = [
  {
    accessorKey: 'bonusTitle',
    header: 'Title',
    cell({ row }) {
      return <Title target={row.original} />;
    },
  },
  {
    accessorKey: 'bonusPercentage',
    header: 'Bonus Percent',
    cell: ({ row }) => `${row?.original?.bonusPercentage} %`,
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
    accessorKey: 'maxAmount',
    header: 'Max. Amount',
    cell: ({ row }) => `${CurrencyFormat(row?.original?.maxAmount)}`,
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
