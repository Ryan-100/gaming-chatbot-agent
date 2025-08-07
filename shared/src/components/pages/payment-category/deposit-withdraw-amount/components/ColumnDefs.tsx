'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text } from '@radix-ui/themes';
import { Switch } from '../../../../ui/switch';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { DepositWithdrawAmountListData } from '../../../../../types/deposit-withdraw-amount.types';
import { DepositToggleDialog } from './DepositToggleDialog';
import { WithdrawToggleDialog } from './WithdrawToggleDialog';
import { UpdateAmountDialog } from './UpdateAmountDialog';
import EditButton from '../../../../shared/buttons/EditButton';
import DeleteButton from '../../../../shared/buttons/DeleteButton';
import { DeleteAmountDialog } from './DeleteAmountDialog';

function Amount(props: { target: DepositWithdrawAmountListData }) {
  const { target } = props;
  return (
    <Flex direction={'column'} className="">
      <Text>{CurrencyFormat(target.amount)}</Text>
    </Flex>
  );
}

function Deposit(props: { target: DepositWithdrawAmountListData }) {
  const { target } = props;
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <Flex direction={'column'} className="">
      <Switch
        checked={target.deposit}
        onCheckedChange={() => setModalOpen(true)}
      />
      {modalOpen && (
        <DepositToggleDialog
          data={target}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </Flex>
  );
}

function Withdraw(props: { target: DepositWithdrawAmountListData }) {
  const { target } = props;
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <Flex direction={'column'} className="">
      <Switch
        checked={target.withdraw}
        onCheckedChange={() => setModalOpen(true)}
      />
      {modalOpen && (
        <WithdrawToggleDialog
          data={target}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </Flex>
  );
}

function Actions(props: { target: DepositWithdrawAmountListData }) {
  const { target } = props;

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  return (
    <Flex gap="2" className="justify-end ">
      <EditButton
        size={'sm'}
        variant="success"
        onClick={() => setEditModalOpen(true)}
      />
      <DeleteButton
        size={'sm'}
        variant="destructive"
        onClick={() => setDeleteModalOpen(true)}
      />
      {editModalOpen && (
        <UpdateAmountDialog
          data={target}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      {deleteModalOpen && (
        <DeleteAmountDialog
          id={target.id}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<DepositWithdrawAmountListData>[] = [
  {
    accessorKey: 'id',
    header: 'No.',
    cell({ row }) {
      return row.index + 1;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    accessorKey: 'deposit',
    header: 'Deposit',
    cell({ row }) {
      return <Deposit target={row.original} />;
    },
  },
  {
    accessorKey: 'withdraw',
    header: 'Withdraw',
    cell({ row }) {
      return <Withdraw target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
