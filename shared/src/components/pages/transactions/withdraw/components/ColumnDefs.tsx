'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { Image } from '../../../../ui/image';
import { ConfirmationDialog } from '../../../../shared/dialog/ConfirmationDialog';
import { TransactionsWithdrawListData } from '../../../../../types/transactions-withdraw.types';
import { CurrencyFormat } from '../../../../../utils';
import dayjs from '../../../../../utils/dayjs';
import {
  useApproveTransactionsWithdrawMutation,
  useRejectTransactionsWithdrawMutation,
} from '../../../../../stores/reducers/transactions-withdraw.reducer';
import { toast } from 'sonner';
import { RejectTransactionDialog } from '../../components/RejectTransactionDialog';

function Player(props: { target: TransactionsWithdrawListData }) {
  const { target } = props;
  return (
    <Flex
      direction={'column'}
      className="gap-1 w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate"
    >
      <Link
        href={`/players/${target.Player.id}?name=${target.Player.name}&route=ALL`}
        className="hover:underline font-semibold"
      >
        <Tooltip content={target.Player.name}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target.Player.name}
          </p>
        </Tooltip>
      </Link>
      <Text>{target.Player.playerCode}</Text>
    </Flex>
  );
}

function ReceivingAccount(props: { target: TransactionsWithdrawListData }) {
  const { target } = props;

  return (
    <Flex align="center" className="gap-4 min-w-40 lg:min-w-64">
      <Image
        src={target.PaymentCategory.File?.url ?? ''}
        alt="paymentType"
        width={32}
        height={32}
        className="object-cover w-8 h-8 rounded-lg"
      />
      <Box className="space-y-1">
        <Tooltip content={target.Player.PlayerPaymentAccount.accountnumber}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target.Player.PlayerPaymentAccount.accountnumber}
          </p>
        </Tooltip>
        <Tooltip content={target.Player.PlayerPaymentAccount.accountName}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target.Player.PlayerPaymentAccount.accountName}
          </p>
        </Tooltip>
      </Box>
    </Flex>
  );
}

function Actions(props: { target: TransactionsWithdrawListData }) {
  const { target } = props;
  const router = useRouter();
  const [acceptModalOpen, setAcceptModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);

  const handleDetailsClick = () => {
    router.push(`/transactions/withdraw/${target.id}`);
  };

  const [acceptAction] = useApproveTransactionsWithdrawMutation();
  const [rejectAction] = useRejectTransactionsWithdrawMutation();

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

  return (
    <Flex align={'center'} className="gap-2">
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
      <ConfirmationDialog
        open={acceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        yesLabel="Accept"
        noLabel="Cancel"
        title="Accept Withdraw Request"
        message="Are you sure you want to accept this withdraw amount?"
        onSubmit={() => {
          acceptHandler();
        }}
        yesBtnColor="surface-success"
      />
      <RejectTransactionDialog
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Withdraw Request"
        message="Are you sure you want to reject this withdraw amount?"
        onSubmit={rejectHandler}
      />
    </Flex>
  );
}

export const columnDefs: ColumnDef<TransactionsWithdrawListData>[] = [
  {
    accessorKey: 'Player.name',
    header: 'Player',
    maxSize: 2,
    cell({ row }) {
      return <Player target={row.original} />;
    },
  },
  {
    accessorKey: 'Player.PlayerPaymentAccount',
    header: 'Receiving Account',
    cell({ row }) {
      return <ReceivingAccount target={row.original} />;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Withdraw Amount',
    cell({ row }) {
      const { amount, receiveableAmount, PaymentCategory } = row.original;
      return (
        <Text>
          {CurrencyFormat(amount)}
          {PaymentCategory?.PaymentType?.isCrypto && receiveableAmount
            ? '/' + CurrencyFormat(receiveableAmount) + ' USDT'
            : ''}
        </Text>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Requested On',
    cell({ row }) {
      const { createdAt } = row.original;
      return (
        <p className="w-32 min-w-32">
          {dayjs(createdAt).format('MMM DD, YYYY h:mm A')}
        </p>
      );
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
