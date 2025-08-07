'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Box, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { PaymentCategoryDetailsDialog } from './PaymentCategoryDetailsDialog';
import dayjs from '../../../../../utils/dayjs';
import { PaymentCategoryListData } from '../../../../../types/payment-category.types';
import UpdatePaymentCategoryFormDialog from './UpdatePaymentCategoryFormDialog';
import EditButton from '../../../../shared/buttons/EditButton';

function PaymentImage(props: { target: PaymentCategoryListData }) {
  const { target } = props;
  return (
    <Box>
      <img
        src={target?.File?.url}
        alt="Level Icon"
        width={32}
        height={32}
        className="min-w-8 min-h-8 object-cover"
      />
    </Box>
  );
}

function TrxNumDigit(props: { target: PaymentCategoryListData }) {
  const { target } = props;
  return <Text className="">{target?.transactionDigitCount || '-'}</Text>;
}

function PaymentCategory(props: { target: PaymentCategoryListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.accountType}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.accountType}
      </p>
    </Tooltip>
  );
}

function PaymentType(props: { target: PaymentCategoryListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.PaymentType?.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.PaymentType?.name}
      </p>
    </Tooltip>
  );
}

function IsPublish(props: { target: PaymentCategoryListData }) {
  const { target } = props;
  return <Text className="">{target?.isPublish ? 'Yes' : 'No'}</Text>;
}

function CreatedAt(props: { target: PaymentCategoryListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2 w-32 min-w-32">
      <Text className="font-medium">
        {dayjs(target?.createdAt).format('YYYY-MM-DD, h:mm A')}
      </Text>
      <Text className="font-medium">
        {dayjs(target?.updatedAt).format('YYYY-MM-DD, h:mm A') || '-'}
      </Text>
    </Flex>
  );
}

function CreatedBy(props: { target: PaymentCategoryListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="gap-2">
      <Tooltip content={target?.createdBy?.name}>
        <p className="font-medium w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.createdBy?.name}
        </p>
      </Tooltip>
      <Tooltip content={target?.updatedBy?.name || '-'}>
        <p className="font-medium w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.updatedBy?.name || '-'}
        </p>
      </Tooltip>
    </Flex>
  );
}

function Actions(props: { target: PaymentCategoryListData }) {
  const { target } = props;
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [detailsModalOpen, setDetilsModalOpen] = React.useState(false);

  return (
    <Flex align="center" className="gap-2">
      <Button
        size="sm"
        className="bg-surface-link "
        onClick={() => setDetilsModalOpen(true)}
      >
        Details
      </Button>
      <EditButton
        size="sm"
        variant="success"
        className="w-[88px]"
        onClick={() => setEditModalOpen(true)}
      />
      {detailsModalOpen && (
        <PaymentCategoryDetailsDialog
          data={target}
          open={detailsModalOpen}
          onClose={() => setDetilsModalOpen(false)}
        />
      )}
      {editModalOpen && (
        <UpdatePaymentCategoryFormDialog
          data={target}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          isCrypto={target.PaymentType?.isCrypto}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<PaymentCategoryListData>[] = [
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
    accessorKey: 'accountType',
    header: 'Payment Category',
    cell({ row }) {
      return <PaymentCategory target={row.original} />;
    },
  },
  {
    accessorKey: 'paymentType',
    header: 'Type',
    cell({ row }) {
      return <PaymentType target={row.original} />;
    },
  },
  {
    accessorKey: 'transactionDigitCount',
    header: 'Trx No. Digit',
    cell({ row }) {
      return <TrxNumDigit target={row.original} />;
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
    accessorKey: 'createdAt',
    header: 'Created/Updated',
    cell({ row }) {
      return <CreatedAt target={row.original} />;
    },
  },
  {
    accessorKey: 'createdBy',
    header: 'Created/Updated by',
    cell({ row }) {
      return <CreatedBy target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
