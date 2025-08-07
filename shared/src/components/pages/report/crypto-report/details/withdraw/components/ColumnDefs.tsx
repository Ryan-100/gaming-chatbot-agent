'use client';
import React from 'react';
import Link from 'next/link';
import dayjs from '../../../../../../../utils/dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../../../ui/button';
import { Image } from '../../../../../../ui/image';
import { WithdrawAccountListData } from '../../../../../../../types/report-crypto.types';
import { CurrencyFormat } from '../../../../../../../utils/currencyFormat';

function Player(props: { target: WithdrawAccountListData }) {
  const { target } = props;
  return (
    <Box className="!flex flex-col gap-y-2">
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
    </Box>
  );
}

function ReceivingAccount(props: { target: WithdrawAccountListData }) {
  const { target } = props;
  return (
    <Flex align="center" className="gap-4 min-w-36">
      <Image
        src={target?.PaymentCategory?.File?.url ?? ''}
        alt="screenshot"
        width={32}
        height={32}
        className="rounded-[10px] w-8 h-8 object-cover"
      />

      <Flex direction={'column'} className="gap-y-2">
        <Tooltip content={target.Player?.PlayerPaymentAccount?.accountnumber}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target.Player?.PlayerPaymentAccount?.accountnumber}
          </p>
        </Tooltip>
        <Tooltip content={target.Player?.PlayerPaymentAccount?.accountName}>
          <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
            {target.Player?.PlayerPaymentAccount?.accountName}
          </p>
        </Tooltip>
      </Flex>
    </Flex>
  );
}

function Amount(props: { target: WithdrawAccountListData }) {
  const { target } = props;
  return (
    <Flex direction={'column'} className="gap-2 w-24 min-w-24">
      <Text>
        {CurrencyFormat(target.amount)}
        {target.PaymentCategory?.PaymentType?.isCrypto &&
        target.receiveableAmount
          ? '/' + CurrencyFormat(target.receiveableAmount) + ' USDT'
          : ''}
      </Text>
    </Flex>
  );
}

function RequestedOn(props: { target: WithdrawAccountListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('MMM DD, YYYY h:mm A')}
    </p>
  );
}

function AcceptedOnBy(props: { target: WithdrawAccountListData }) {
  const { target } = props;
  return (
    <Flex direction={'column'} className="gap-2">
      <p className="w-32 min-w-32">
        {dayjs(target.updatedAt).format('MMM DD, YYYY h:mm A')}
      </p>
      <Tooltip content={target?.ApprovedAdmin?.name}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate font-semibold">
          {target?.ApprovedAdmin?.name}
        </p>
      </Tooltip>
    </Flex>
  );
}

function Actions(props: { target: WithdrawAccountListData }) {
  const { target } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const time = searchParams.get('time');
  const name = searchParams.get('name');
  const categoryId = searchParams.get('categoryId');
  const accountName = searchParams.get('accountName');
  const accountId = searchParams.get('accountId');

  const handleDetailsClick = () => {
    router.push(
      `/crypto-report/${accountId}/withdraw/${target.id}?name=${name}&type=${type}&time=${time}&accountName=${accountName}&categoryId=${categoryId}&accountId=${accountId}`
    );
  };
  return (
    <Button size="sm" className="bg-surface-link" onClick={handleDetailsClick}>
      Details
    </Button>
  );
}

export const columnDefs: ColumnDef<WithdrawAccountListData>[] = [
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
    header: 'Withdraw Amount',
    cell({ row }) {
      return <Amount target={row.original} />;
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
    accessorKey: 'updatedAt',
    header: 'Accepted on/ by',
    cell({ row }) {
      return <AcceptedOnBy target={row.original} />;
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
