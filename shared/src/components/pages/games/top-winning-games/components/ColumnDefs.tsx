import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { useRouter } from 'next/navigation';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { TopWinningGameListData } from '../../../../../types/top-winning-games.types';
import Link from 'next/link';

function ChildGameName(props: { target: TopWinningGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.childGames.game_name_en}>
      <Link
        href={`child-games/${target.childGames?.id}?name=${target.childGames.game_name_en}`}
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate hover:underline">
          {target.childGames.game_name_en}
        </p>
      </Link>
    </Tooltip>
  );
}

function MainGameName(props: { target: TopWinningGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.mainGames.game_name}>
      <Link
        href={`main-games/${target?.mainGames?.id}?name=${target.mainGames.game_name}`}
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate hover:underline">
          {target.mainGames.game_name}
        </p>
      </Link>
    </Tooltip>
  );
}

function TopWinningActions(props: { target: TopWinningGameListData }) {
  const router = useRouter();
  const handleDetailsClick = () => {
    router.push(`/top-winning-games/winners/${props.target.childGames.id}`);
  };

  return (
    <Button
      size={'sm'}
      className="bg-surface-link"
      onClick={handleDetailsClick}
    >
      See Winners
    </Button>
  );
}

function Status(props: { target: TopWinningGameListData }) {
  const { target } = props;

  return (
    <Text className="capitalize cursor-pointer hover:underline">
      {target.mainGames.has_child === 1
        ? target.childGames.is_active
          ? 'Active'
          : 'Inactive'
        : target.mainGames.is_active
        ? 'Active'
        : 'Inactive'}
    </Text>
  );
}

export const columnDefs: ColumnDef<TopWinningGameListData>[] = [
  {
    header: 'Sort. No',
    cell: ({ row }) => {
      return <Text>{row.index + 1}</Text>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Child Game Name',
    cell({ row }) {
      return <ChildGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Main Game Name',
    cell({ row }) {
      return <MainGameName target={row.original} />;
    },
  },
  // {
  //   accessorKey: 'Total Player',
  //   cell: ({ row }) => (
  //     <Text>{CurrencyFormat(row.original.totalPlayerCount)}</Text>
  //   ),
  // },
  {
    accessorKey: 'Win Amount',
    cell: ({ row }) => (
      <Text> {CurrencyFormat(parseInt(row.original.totalWinValue))}</Text>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  {
    header: 'Action',
    cell: ({ row }) => <TopWinningActions target={row.original} />,
  },
];
