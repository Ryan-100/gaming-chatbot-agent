'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Box, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { PaymentManagementDetailsDialog } from './PaymentManagementDetailsDialog';
import { PaymentManagementListData } from '../../../../../types/payment-management.types';
import UpdatePaymentManagementFormDialog from './UpdatePaymentManagementFormDialog';
import EditButton from '../../../../shared/buttons/EditButton';

function PaymentImage(props: { target: PaymentManagementListData }) {
  const { target } = props;
  return (
    <Box>
      {target?.Image?.url ? (
        <img
          src={target?.Image?.url}
          alt="Level Icon"
          width={32}
          height={32}
          className="min-w-8 min-h-8 object-cover"
        />
      ) : (
        '_'
      )}
    </Box>
  );
}

function PaymentCategory(props: { target: PaymentManagementListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.PaymentCategory?.accountType}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.PaymentCategory?.accountType}
      </p>
    </Tooltip>
  );
}

function AccountName(props: { target: PaymentManagementListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.accountName ?? '-'}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.accountName ?? '-'}
      </p>
    </Tooltip>
  );
}

function PaymentInfo(props: { target: PaymentManagementListData }) {
  const { target } = props;
  return (
    <Flex direction={'column'} justify={'start'}>
      <Tooltip content={target?.CryptoNetwork?.name ?? ''}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.CryptoNetwork?.name ?? ''}
        </p>
      </Tooltip>
      <Tooltip content={target.accountNumber ?? '-'}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.accountNumber ?? '-'}
        </p>
      </Tooltip>
      <Tooltip content={target.memo ?? ''}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.memo ?? ''}
        </p>
      </Tooltip>
    </Flex>
  );
}

function IsPublish(props: { target: PaymentManagementListData }) {
  const { target } = props;
  return <Text className="">{target.isPublish ? 'Yes' : 'No'}</Text>;
}

function IsScreenshot(props: { target: PaymentManagementListData }) {
  const { target } = props;
  return <Text className="">{target.ssRequired ? 'Yes' : 'No'}</Text>;
}

function ShowQR(props: { target: PaymentManagementListData }) {
  const { target } = props;
  return <Text className="">{target.showQR ? 'Yes' : 'No'}</Text>;
}

function UserLevel(props: { target: PaymentManagementListData }) {
  const { target } = props;
  return <p className="w-16 min-w-16">{target.PlayerLevel?.name}</p>;
}

function Actions(props: { target: PaymentManagementListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [detailsModalOpen, setDetilsModalOpen] = React.useState(false);
  return (
    <Flex align="center" className="gap-2">
      <Button
        size="sm"
        className="bg-surface-link"
        onClick={() => setDetilsModalOpen(true)}
      >
        Details
      </Button>
      <EditButton
        size="sm"
        variant="success"
        onClick={() => setEditModalOpen(true)}
        className="w-[88px]"
      />
      {detailsModalOpen && (
        <PaymentManagementDetailsDialog
          data={target}
          open={detailsModalOpen}
          onClose={() => setDetilsModalOpen(false)}
        />
      )}
      {editModalOpen && (
        <UpdatePaymentManagementFormDialog
          data={target}
          title="Payment Account"
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          yesLabel="Update"
          useNetwork={target.PaymentCategory.PaymentType.useNetwork}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<PaymentManagementListData>[] = [
  {
    accessorKey: 'order',
    header: 'Sort No.',
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell({ row }) {
      return <PaymentImage target={row.original} />;
    },
  },
  {
    accessorKey: 'paymentCategoryId',
    header: 'Payment Category',
    cell({ row }) {
      return <PaymentCategory target={row.original} />;
    },
  },
  {
    accessorKey: 'accountName',
    header: 'Account Name',
    cell({ row }) {
      return <AccountName target={row.original} />;
    },
  },
  {
    accessorKey: 'accountName',
    header: 'Payment Info',
    cell({ row }) {
      return <PaymentInfo target={row.original} />;
    },
  },
  {
    accessorKey: 'PlayerLevel',
    header: 'User Level',
    cell({ row }) {
      return <UserLevel target={row.original} />;
    },
  },
  {
    accessorKey: 'isPublish',
    header: 'Is Published?',
    cell({ row }) {
      return <IsPublish target={row.original} />;
    },
  },
  {
    accessorKey: 'ssRequired',
    header: 'Screenshot Require?',
    cell({ row }) {
      return <IsScreenshot target={row.original} />;
    },
  },
  {
    accessorKey: 'showQR',
    header: 'QR Show?',
    cell({ row }) {
      return <ShowQR target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
