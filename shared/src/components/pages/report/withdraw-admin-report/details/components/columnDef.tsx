'use client';
import React, { useState } from 'react';
import dayjs from '../../../../../../utils/dayjs';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../../ui/button';
import { TransactionListData } from '../../../../../../types/report-withdraw-admin.types';
import { CurrencyFormat } from '../../../../../../../src/utils/currencyFormat';
import { DetailsModal } from './DetailsModal';

function Amount(props: { target: TransactionListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.amount)}</Text>;
}

function DateAndTime(props: { target: TransactionListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}

function Status(props: { target: TransactionListData }) {
  const { target } = props;
  return (
    <Text className="capitalize">{target.status.toLowerCase() ?? '-'}</Text>
  );
}

function Actions(props: { target: TransactionListData }) {
  const { target } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const handleDetailsClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Button
        size={'sm'}
        variant="success"
        onClick={() => handleDetailsClick()}
      >
        Details
      </Button>
      {modalOpen && (
        <DetailsModal
          id={target.id}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export const columnDefs: ColumnDef<TransactionListData>[] = [
  {
    header: 'Amount',
    accessorKey: 'amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  {
    header: 'Date & Time',
    accessorKey: 'createAt',
    cell({ row }) {
      return <DateAndTime target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
//not added
function USDTAmount(props: { target: TransactionListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.usdt)}</Text>;
}

export const cryptoAdminColumnDefs: ColumnDef<TransactionListData>[] = [
  {
    header: 'Amount (USDT)',
    accessorKey: 'amount',
    cell({ row }) {
      return <USDTAmount target={row.original} />;
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  {
    header: 'Date & Time',
    accessorKey: 'createAt',
    cell({ row }) {
      return <DateAndTime target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
