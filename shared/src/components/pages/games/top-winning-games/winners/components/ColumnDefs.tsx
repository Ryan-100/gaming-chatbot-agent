'use client';
import { useRouter } from 'next/navigation';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Text, Flex, Tooltip } from '@radix-ui/themes';
import { TopWinnerListData } from '../../../../../../types/top-winning-games.types';
import { CurrencyFormat } from '../../../../../../utils/currencyFormat';

function ChildGameName(props: { target: TopWinnerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.childGames.game_name_en}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.childGames.game_name_en}
      </p>
    </Tooltip>
  );
}

function MainGameName(props: { target: TopWinnerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.mainGames.game_name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.mainGames.game_name}
      </p>
    </Tooltip>
  );
}

const User = ({ row }: { row: Row<TopWinnerListData> }) => {
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(
      `/players/${row.original.user_id}?name=${row.original.users.name}`
    );
  };

  return (
    <Flex
      justify={'start'}
      align={'start'}
      direction={'column'}
      onClick={handleDetailsClick}
      className="cursor-pointer"
    >
      <Tooltip content={row.original.users.name}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate hover:underline font-semibold">
          {row.original.users.name}
        </p>
      </Tooltip>
      <Text> {row.original.users?.phone ?? row.original.users?.email} </Text>
    </Flex>
  );
};

const FormattedAmount = ({ row }: { row: Row<TopWinnerListData> }) => {
  return <Text> {CurrencyFormat(row.original.totalWinValue)} MMK</Text>;
};

export const columnDefs: ColumnDef<TopWinnerListData>[] = [
  {
    header: 'Sorting No',
    cell: ({ row }) => {
      return <Text>{row.index + 1}</Text>;
    },
  },
  {
    accessorKey: 'childGameName',
    header: 'Child Game Name',
    cell({ row }) {
      return <ChildGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'mainGameName',
    header: 'Main Game Name',
    cell({ row }) {
      return <MainGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      return <User row={row} />;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Win Amount',
    cell: ({ row }) => {
      return <FormattedAmount row={row} />;
    },
  },
];
