import dayjs from '../../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { SpinHistoryListData } from '../../../../../types/spin-history.types';
import { Box } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { Button } from '../../../../ui/button';

function SpinActions(props: { target: SpinHistoryListData }) {
  const router = useRouter();
  const { target } = props;

  const handleDetailsClick = () => {
    router.push(`/spin-history/daily-details?date=${target.createdAtDate}`);
  };

  return (
    <Button
      size={'sm'}
      className="bg-surface-link"
      onClick={() => handleDetailsClick()}
    >
      Details
    </Button>
  );
}

export const columnDef: ColumnDef<SpinHistoryListData>[] = [
  {
    header: 'Date',
    accessorKey: 'createdAtDate',
    cell: ({ row }) => (
      <Box className="w-24 min-w-24">
        {dayjs(row.original?.createdAtDate).format('MMM DD, YYYY')}
      </Box>
    ),
  },
  {
    header: 'Total Claim',
    accessorKey: 'total_amount',
    cell: ({ row }) => <Box>{CurrencyFormat(row.original?.total_count)}</Box>,
  },
  {
    header: 'Total Reward Amount',
    accessorKey: 'total_count',
    cell: ({ row }) => <Box>{CurrencyFormat(row.original?.total_amount)}</Box>,
  },
  // {
  //   header: 'Created Date',
  //   accessorKey: 'createdAt',
  //   cell: ({ row }) => (
  //     <Box>{dayjs(row.original.createdAt).format('MMM DD, YYYY, h:mm A')}</Box>
  //   ),
  // },
  // {
  //   header: 'Expired On',
  //   accessorKey: 'expiredDate',
  //   cell: ({ row }) => (
  //     <Box className="text-text-error">
  //       {dayjs(row.original.expiredDate).format('MMM DD, YYYY, h:mm A')}
  //     </Box>
  //   ),
  // },
  {
    header: 'Action',
    cell: ({ row }) => <SpinActions target={row.original} />,
  },
];
