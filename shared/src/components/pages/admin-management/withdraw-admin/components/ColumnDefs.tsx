'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Tooltip, Text } from '@radix-ui/themes';
import { EditWithdrawAdminFormDialog } from './EditWithdrawAdminFormDialog';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { WithdrawAdminListData } from '../../../../../types/withdraw-admin.types';
import EditButton from '../../../../shared/buttons/EditButton';

function Status(props: { target: WithdrawAdminListData }) {
  const { target } = props;

  return (
    <Text className="capitalize cursor-pointer hover:underline">
      {target.AdminStatus.toLocaleLowerCase()}
    </Text>
  );
}

function Name(props: { target: WithdrawAdminListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.name}
      </p>
    </Tooltip>
  );
}

function PaymentType(props: { target: WithdrawAdminListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2">
      <Tooltip
        content={
          target.WithdrawAccountHolder[0]?.PaymentAccount?.PaymentCategory
            ?.accountType
        }
        className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate"
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {
            target.WithdrawAccountHolder[0]?.PaymentAccount?.PaymentCategory
              ?.accountType
          }
        </p>
      </Tooltip>
      {/* {target.WithdrawAccountHolder.map((account) => (
        <Text key={account.id} className='first:font-medium'>{account.PaymentAccount.PaymentCategory.accountType}</Text>
      ))} */}
    </Flex>
  );
}

function AmountRange(props: { target: WithdrawAdminListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2">
      <Tooltip
        content={`${CurrencyFormat(
          target.WithdrawAccountHolder[0]?.minAmount ?? 0
        )} - ${CurrencyFormat(
          target.WithdrawAccountHolder[0]?.maxAmount ?? 0
        )}`}
        className="max-w-52 truncate"
      >
        <p>
          {CurrencyFormat(target.WithdrawAccountHolder[0]?.minAmount ?? 0)}
          &nbsp;-&nbsp;
          {CurrencyFormat(target.WithdrawAccountHolder[0]?.maxAmount ?? 0)}
        </p>
      </Tooltip>
      {/* {target.WithdrawAccountHolder.map((account) => (
        <Text className='first:font-medium'>
          {CurrencyFormat(account.minAmount)} -
          {CurrencyFormat(account.maxAmount)}
        </Text>
      ))} */}
    </Flex>
  );
}

function Actions(props: { target: WithdrawAdminListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  return (
    <Box className="">
      <EditButton
        size="sm"
        variant="success"
        onClick={() => setEditModalOpen(true)}
      />
      {editModalOpen && (
        <EditWithdrawAdminFormDialog
          data={target}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </Box>
  );
}

export const columnDefs: ColumnDef<WithdrawAdminListData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    accessorKey: 'agentCode',
    header: 'Login ID',
  },
  {
    accessorKey: 'payment_type',
    header: 'Payment Category Name',
    cell({ row }) {
      return <PaymentType target={row.original} />;
    },
  },
  // {
  //   accessorKey: 'phone',
  //   header: 'Phone',
  // },
  {
    accessorKey: 'range',
    header: 'Amount Range',
    cell({ row }) {
      return <AmountRange target={row.original} />;
    },
  },
  {
    accessorKey: 'AdminStatus',
    header: 'Status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
