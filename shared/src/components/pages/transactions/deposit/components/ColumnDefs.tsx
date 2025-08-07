'use client';
import React from 'react';
import Link from 'next/link';
import dayjs from '../../../../../utils/dayjs';
import { useRouter } from 'next/navigation';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { Button } from '../../../../ui/button';
import { Image } from '../../../../ui/image';
import { ConfirmationDialog } from '../../../../shared/dialog/ConfirmationDialog';
import { RejectTransactionDialog } from '../../components/RejectTransactionDialog';
import { TransactionsDepositListData } from '../../../../../types/transactions-deposit.types';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import {
  useApproveTransactionsDepositMutation,
  useRejectTransactionsDepositMutation,
} from '../../../../../stores/reducers/transactions-deposit.reducer';

function Player(props: { target: TransactionsDepositListData }) {
  const { target } = props;
  return (
    <Box className="!flex flex-col gap-y-2">
      <Link
        href={`/players/${target?.Player?.id}?name=${target?.Player?.name}&route=ALL`}
        className="hover:underline font-semibold"
      >
        <Tooltip content={target?.Player?.name ?? '-'}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target?.Player?.name ?? '-'}
          </p>
        </Tooltip>
      </Link>
    </Box>
  );
}

function ReceivingAccount(props: { target: TransactionsDepositListData }) {
  const { target } = props;
  return (
    <Flex align="center" className="gap-4 w-fit">
      {target?.PaymentCategory?.File?.url ? (
        <Image
          src={target?.PaymentCategory?.File?.url ?? ''}
          alt="screenshot"
          width={32}
          height={32}
          className="rounded-[10px] w-8 h-8 object-cover"
        />
      ) : (
        <Text>-</Text>
      )}
      <Flex direction={'column'} className="gap-y-2">
        <Tooltip content={target?.PaymentAccount?.accountNumber}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate font-semibold">
            {target?.PaymentAccount?.accountNumber}
          </p>
        </Tooltip>
        <Tooltip content={target?.PaymentAccount?.accountName}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target?.PaymentAccount?.accountName}
          </p>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
function Screenshot(props: { target: TransactionsDepositListData }) {
  const { target } = props;
  return (
    <Flex justify="center" className="w-12 h-12">
      {target.Image?.url ? (
        <Image
          src={target.Image.url}
          alt="screenshot"
          width={48}
          height={48}
          className="rounded-sm object-cover min-w-12 min-h-12"
        />
      ) : (
        <Text className="text-center">-</Text>
      )}
    </Flex>
  );
}
function Amount(props: { target: TransactionsDepositListData }) {
  const { target } = props;
  return (
    <Flex direction={'column'} className="gap-2 w-24 min-w-24">
      <Text>
        {CurrencyFormat(target.amount)}
        {target?.PaymentCategory?.PaymentType?.isCrypto &&
        target?.transferedAmount
          ? '/' + CurrencyFormat(target?.transferedAmount) + ' USDT'
          : ''}
      </Text>
      <Text>PIN : {target?.transactionId}</Text>
    </Flex>
  );
}
function RequestedOn(props: { target: TransactionsDepositListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('MMM DD, YYYY h:mm A')}
    </p>
  );
}

function Actions(props: { target: TransactionsDepositListData }) {
  const { target } = props;
  const router = useRouter();
  const [acceptModalOpen, setAcceptModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);

  const [acceptAction] = useApproveTransactionsDepositMutation();
  const [rejectAction] = useRejectTransactionsDepositMutation();

  const acceptHandler = async () => {
    try {
      const response = await acceptAction({ id: target.id });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rejectHandler = async (reason: string) => {
    try {
      const response = await rejectAction({
        id: target.id,
        data: { reason: reason },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        setRejectModalOpen(false);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailsClick = () => {
    router.push(`/transactions/deposit/${target.id}`);
  };
  return (
    <Flex align="center" className="gap-2">
      {target.status === 'PENDING' && (
        <>
          <Button
            size="sm"
            onClick={() => setAcceptModalOpen(true)}
            variant="success"
          >
            Accept
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setRejectModalOpen(true)}
          >
            Reject
          </Button>
        </>
      )}
      <Button
        size="sm"
        className="bg-surface-link"
        onClick={handleDetailsClick}
      >
        Details
      </Button>
      {acceptModalOpen && (
        <ConfirmationDialog
          open={acceptModalOpen}
          onClose={() => setAcceptModalOpen(false)}
          yesLabel="Accept"
          noLabel="Cancel"
          title="Accept Deposit Request"
          message="Are you sure you want to accept this deposit amount?"
          onSubmit={() => {
            acceptHandler();
          }}
          yesBtnColor="surface-success"
        />
      )}
      {rejectModalOpen && (
        <RejectTransactionDialog
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          title="Reject Deposit Request"
          message="Are you sure you want to reject this deposit amount?"
          onSubmit={rejectHandler}
        />
      )}
    </Flex>
  );
}

export const columnDefs: ColumnDef<TransactionsDepositListData>[] = [
  {
    accessorKey: 'id',
    header: 'No.',
    cell({ row }) {
      return row.index + 1;
    },
  },
  {
    accessorKey: 'name',
    header: 'Player',
    cell({ row }) {
      return <Player target={row.original} />;
    },
  },
  {
    accessorKey: 'promocode&created',
    header: 'Receiving Account',
    cell({ row }) {
      return <ReceivingAccount target={row.original} />;
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
    accessorKey: 'screenshot',
    header: 'Screenshot',
    cell({ row }) {
      return <Screenshot target={row.original} />;
    },
  },
  {
    accessorKey: 'requestedOn',
    header: 'Requested On',
    cell({ row }) {
      return <RequestedOn target={row.original} />;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
