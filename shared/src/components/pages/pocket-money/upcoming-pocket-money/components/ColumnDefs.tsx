'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { formatNumber } from '../../../../../utils/formatNumber';
import { Button } from '../../../../ui/button';
import { DetailsDialog } from '../../components/DetailsDialog';
import { PocketMoneyListData } from '../../../../../types/pocket-money.type';
import dayjs from '../../../../../utils/dayjs';
import EditButton from '../../../../shared/buttons/EditButton';

function Title(props: { target: PocketMoneyListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.title}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.title}
      </p>
    </Tooltip>
  );
}

function Amount(props: { target: PocketMoneyListData }) {
  const { target } = props;
  return <Text>{formatNumber(target?.totalAmount)}</Text>;
}

function Actions(props: { target: PocketMoneyListData }) {
  const { target } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Flex align={'center'} className="gap-2">
      <EditButton
        size="sm"
        variant="success"
        href={`/pocket-money/upcoming-pocket-money/edit?id=${target?.id}`}
        className="w-[88px]"
      />
      <Button
        size="sm"
        className="bg-surface-link w-[88px]"
        onClick={() => setModalOpen(true)}
      >
        Details
      </Button>
      {modalOpen && (
        <DetailsDialog
          id={target?.id}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          status="Upcoming"
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<PocketMoneyListData>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell({ row }) {
      return <Title target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    accessorKey: 'createdDate',
    header: 'Created Date',
    cell: ({ row }) => (
      <Flex className="min-w-32 w-32">
        {dayjs(row?.original?.startDate).format('MMM DD, YYYY, h:mm A')}
      </Flex>
    ),
  },
  {
    accessorKey: 'bonusExpiredTime',
    header: 'Expired Date',
    cell: ({ row }) => (
      <Flex className="min-w-32 w-32">
        {dayjs(row?.original?.endDate).format('MMM DD, YYYY, h:mm A')}
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
