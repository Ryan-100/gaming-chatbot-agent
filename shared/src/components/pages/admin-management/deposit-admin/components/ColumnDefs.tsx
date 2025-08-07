'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { EditDepositAdminDialog } from './EditDepositAdminDialog';
import { DepositAdminListData } from '../../../../../types/deposit-admin.types';
import EditButton from '../../../../shared/buttons/EditButton';

function Name(props: { target: DepositAdminListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.name}
      </p>
    </Tooltip>
  );
}

function PaymentType(props: { target: DepositAdminListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2">
      <Tooltip
        content={
          target.TopupAccountHolder[0]?.PaymentAccount?.PaymentCategory
            ?.accountType
        }
        className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate"
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {
            target.TopupAccountHolder[0]?.PaymentAccount?.PaymentCategory
              ?.accountType
          }
        </p>
      </Tooltip>
      {/* {target.TopupAccountHolder.map((account) => (
        <Text key={account.id} className='first:font-medium'>{account.PaymentAccount.PaymentCategory.accountType}</Text>
      ))} */}
    </Flex>
  );
}
function Status(props: { target: DepositAdminListData }) {
  const { target } = props;

  return (
    <Text className="capitalize cursor-pointer hover:underline">
      {target.AdminStatus.toLocaleLowerCase()}
    </Text>
  );
}

function Actions(props: { target: DepositAdminListData }) {
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
        <EditDepositAdminDialog
          data={target}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </Box>
  );
}

export const columnDefs: ColumnDef<DepositAdminListData>[] = [
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
    accessorKey: 'paymentType',
    header: 'Payment Type',
    cell({ row }) {
      return <PaymentType target={row.original} />;
    },
  },
  // {
  //   accessorKey: 'phone',
  //   header: 'Phone',
  // },
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
