'use client';
import dayjs from '../../../../../../utils/dayjs';
import Link from 'next/link';
import { DailySpinHistoryListData } from '../../../../../../types/spin-history.types';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Tooltip } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../../ui/button';
import { CurrencyFormat } from '../../../../../../utils/currencyFormat';

function Name(props: { target: DailySpinHistoryListData }) {
  const { target } = props;
  return (
    <Tooltip content={target?.Player?.name}>
      <Link
        href={`/players/${target?.Player?.id}?name=${target?.Player?.name}&route=ALL`}
        className="hover:underline font-semibold"
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target?.Player?.name}
        </p>
      </Link>
    </Tooltip>
  );
}

function Level(props: { target: DailySpinHistoryListData }) {
  const { target } = props;
  return (
    <Tooltip content={target?.Player?.PlayerLevel?.name}>
      <p className="w-20 max-w-20 lg:w-36 lg:max-w-36 xl:w-60 xl:max-w-60 truncate">
        {target?.Player?.PlayerLevel?.name}
      </p>
    </Tooltip>
  );
}

function Actions(props: { target: DailySpinHistoryListData }) {
  const router = useRouter();
  const { target } = props;

  const handleDetailsClick = () => {
    router.push(`/spin-history/daily-details/setting-details?id=${target?.id}`);
  };

  return (
    <Button
      size={'sm'}
      variant="outline"
      className="border-surface-link"
      onClick={() => handleDetailsClick()}
    >
      View Spin info
    </Button>
  );
}

export const columnDef: ColumnDef<DailySpinHistoryListData>[] = [
  {
    accessorKey: 'count',
    header: 'No',
    cell: ({ row }) => `${row.index + 1}`,
    size: 50,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    accessorKey: 'level',
    header: 'Level',
    cell({ row }) {
      return <Level target={row.original} />;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Reward Amount',
    cell: ({ row }) => <Box>{CurrencyFormat(row.original?.bonusAmount)}</Box>,
  },
  {
    header: 'Claimed On',
    accessorKey: 'claimedOn',
    cell: ({ row }) => (
      <Box className="w-32 min-w-32">
        {dayjs(row.original?.createdAt).format('MMM DD, YYYY, h:mm A')}
      </Box>
    ),
  },
  {
    header: 'Action',
    cell: ({ row }) => <Actions target={row.original} />,
    size: 150,
  },
];
