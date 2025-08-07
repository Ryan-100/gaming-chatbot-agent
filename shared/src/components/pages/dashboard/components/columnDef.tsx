'use client';
import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../ui/button';
import { useRouter } from 'next/navigation';
import { CurrencyFormat } from '../../../../utils/currencyFormat';
import { TopWinningPlayerListData } from '../../../../types/top-winning-players.types';
import { HotGameListData } from '../../../../types/hot-games.types';
import { TopWinningGameListData } from '../../../../types/top-winning-games.types';

function Username(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Link
      href={`/players/${target.users?.id}?name=${target.users.name}`}
      className="hover:underline"
    >
      <Tooltip content={target.users.name}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.users.name}
        </p>
      </Tooltip>
    </Link>
  );
}

function ChildGameName(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.childGames.game_name_en}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.childGames.game_name_en}
      </p>
    </Tooltip>
  );
}

function MainGameName(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.mainGames.game_name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.mainGames.game_name}
      </p>
    </Tooltip>
  );
}

function UserID(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Flex direction="column" className="text-xs">
      <Text className="font-semibold">{target.users.player_code}</Text>
    </Flex>
  );
}

function Amount(props: { target: TopWinningPlayerListData }) {
  const { target } = props;
  return (
    <Flex direction={'column'} className="gap-2">
      <Text>{CurrencyFormat(parseInt(target.win_value))}</Text>
    </Flex>
  );
}

export const winnerColumnDefs: ColumnDef<TopWinningPlayerListData>[] = [
  {
    accessorKey: 'id',
    header: 'Sort No.',
    cell: ({ row }) => {
      return <Text>{row.index + 1}</Text>;
    },
  },
  {
    accessorKey: 'phone&registeredDate',
    header: 'User ID',
    cell({ row }) {
      return <UserID target={row.original} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Username',
    cell({ row }) {
      return <Username target={row.original} />;
    },
  },
  {
    accessorKey: 'game',
    header: 'Child Games',
    cell({ row }) {
      return <ChildGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'mainGame',
    header: 'Main Games',
    cell({ row }) {
      return <MainGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'win',
    header: 'Win Amt.',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
];

function HotChildGameName(props: { target: HotGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.childGames.game_name_en}>
      <Link
        href={`child-games/${target.childGames.id}?name=${target.childGames.game_name_en}`}
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate hover:underline">
          {target.childGames.game_name_en}
        </p>
      </Link>
    </Tooltip>
  );
}

function HotMainGameName(props: { target: HotGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.mainGames.game_name}>
      <Link
        href={`main-games/${target.mainGames.id}?name=${target.mainGames.game_name}`}
      >
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate hover:underline">
          {target.mainGames.game_name}
        </p>
      </Link>
    </Tooltip>
  );
}

function Status(props: { target: HotGameListData }) {
  const { target } = props;
  return (
    <Text className="">
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

export const hotGameColumnDefs: ColumnDef<HotGameListData>[] = [
  {
    header: 'Sort No',
    cell: ({ row }) => {
      return <Text>{row.index + 1}</Text>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Child Game Name',
    cell({ row }) {
      return <HotChildGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Main Game Name',
    cell({ row }) {
      return <HotMainGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  // {
  //   accessorKey: 'row',
  //   header: 'Actions',
  //   cell: ({ row }) => (
  //     <Link href={''}>
  //       <Button size="sm" className="bg-surface-link">
  //         Details
  //       </Button>
  //     </Link>
  //   ),
  // },
];

function TopChildGameName(props: { target: TopWinningGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.childGames.game_name_en}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.childGames.game_name_en}
      </p>
    </Tooltip>
  );
}

function TopMainGameName(props: { target: TopWinningGameListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.mainGames.game_name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.mainGames.game_name}
      </p>
    </Tooltip>
  );
}

function TopGameActions(props: { target: TopWinningGameListData }) {
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
      Details
    </Button>
  );
}

function TopGameStatus(props: { target: TopWinningGameListData }) {
  const { target } = props;

  return (
    <Text className="capitalize cursor-pointer hover:underline">
      {/* {target.childGames?.is_active === 1
        ? 'Active'
        : !target.childGames && target.mainGames?.is_active === 1
        ? 'Avtive'
        : 'Inactive'} */}
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

export const winningGameColumnDefs: ColumnDef<TopWinningGameListData>[] = [
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
      return <TopChildGameName target={row.original} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Main Game Name',
    cell({ row }) {
      return <TopMainGameName target={row.original} />;
    },
  },
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
      return <TopGameStatus target={row.original} />;
    },
  },
  {
    header: 'Action',
    cell: ({ row }) => <TopGameActions target={row.original} />,
  },
];
