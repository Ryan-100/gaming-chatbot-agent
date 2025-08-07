'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { formatNumber } from '../../../../../utils/formatNumber';
import { Button } from '../../../../ui/button';
import { DetailsDialog } from '../../components/DetailsDialog';
import { PocketMoneyListData } from '../../../../../types/pocket-money.type';
import dayjs from '../../../../../utils/dayjs';

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
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleTransactionClick = () => {
    router.push(`/pocket-money/history/transactions?id=${target?.id}`);
  };

  return (
    <Flex className="gap-2">
      <Button size="sm" variant="outline" onClick={handleTransactionClick}>
        Transactions
      </Button>
      <Button
        size="sm"
        className="bg-surface-link"
        onClick={() => setModalOpen(true)}
      >
        Details
      </Button>
      {modalOpen && (
        <DetailsDialog
          id={target?.id}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          status="Expired"
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
      <p className="min-w-36 w-36">
        {dayjs(row?.original?.startDate).format('MMM DD, YYYY, h:mm A')}
      </p>
    ),
  },
  {
    accessorKey: 'bonusExpiredTime',
    header: 'Expired Date',
    cell: ({ row }) => (
      <p className="min-w-36 w-36">
        {dayjs(row?.original?.endDate).format('MMM DD, YYYY, h:mm A')}
      </p>
    ),
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
