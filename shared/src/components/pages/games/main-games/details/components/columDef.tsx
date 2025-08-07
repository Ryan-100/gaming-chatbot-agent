import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { LangCardType } from './type';
import { ChildGameListDataByMain } from '../../../../../../types/child-games.types';

const Icon = ({ url }: { url: string }) => {
  return <img src={url} width={24} height={24} alt="icon" />;
};

function ChildGameName(props: { target: ChildGameListDataByMain }) {
  const { target } = props;
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/child-games/${target.id}?name=${target.game_name_en}`);
  };
  return (
    <button onClick={handleRedirect} className="hover:underline">
      <Tooltip content={target.game_name_en}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.game_name_en}
        </p>
      </Tooltip>
    </button>
  );
}

function Status(props: { target: ChildGameListDataByMain }) {
  const { target } = props;
  return <Text className="">{target.is_active ? 'Active' : 'Inactive'}</Text>;
}

export const langColumnDef: ColumnDef<LangCardType>[] = [
  {
    accessorKey: 'lang',
    header: 'Language',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'iconUrl',
    cell: ({ row }) => <Icon url={row.original.iconUrl} />,
  },
];

export const childGameColumnDef: ColumnDef<ChildGameListDataByMain>[] = [
  {
    header: 'Sorting No',
    cell: ({ row }) => {
      return <Text>{row.original.sorting}</Text>;
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
    header: 'Status',
    accessorKey: 'status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  // {
  //   header: 'Tracking Link',
  //   accessorKey: 'link',
  // },
];
