import { ColumnDef } from '@tanstack/react-table';
import { Text, Flex } from '@radix-ui/themes';
import { CurrencyFormat } from '../../../../../utils';
import { GameReportData } from '../../../../../types/report-interval.types';
import { winOrLose } from '../../../../../utils/winOrLose';

interface ColumnTextProps {
  topText: number;
  bottomText: number;
}

const ColumnText = ({ topText, bottomText }: ColumnTextProps) => {
  return (
    <Flex direction={'column'} className="">
      <Text className="font-semibold"> {CurrencyFormat(topText)} </Text>
      <Text> {CurrencyFormat(bottomText)} </Text>
    </Flex>
  );
};

export const resultColumnDef: ColumnDef<GameReportData>[] = [
  {
    header: 'Main Game',
    accessorKey: 'name',
    cell: ({ row }) => row.original?.mainGame?.game_name ?? '_',
  },
  {
    header: 'Qty (In/Out)',
    accessorKey: 'qty',
    cell: ({ row }) => (
      <ColumnText
        topText={row.original?.qtyIn}
        bottomText={row.original?.qtyOut}
      />
    ),
  },
  {
    header: 'Amt. (In/Out)',
    accessorKey: 'amt',
    cell: ({ row }) => (
      <ColumnText
        topText={row.original?.amountIn}
        bottomText={row.original?.amountOut}
      />
    ),
  },
  {
    header: 'Win/Lose',
    accessorKey: 'winAndLose',
    cell: ({ row }) => (
      <p className={winOrLose(row?.original?.winAndLose)}>
        {CurrencyFormat(row?.original?.winAndLose)}
      </p>
    ),
  },
];
