import { ColumnDef } from '@tanstack/react-table';
import { ChildGameType, LangCardType } from './type';
import { Text, Tooltip } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const Icon = ({ url }: { url: string }) => {
  return <img src={url} width={24} height={24} alt="icon" />;
};

function Name(props: { target: LangCardType }) {
  const { target } = props;
  return (
    <Tooltip content={target.name}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.name}
      </p>
    </Tooltip>
  );
}

function Status(props: { target: ChildGameType }) {
  const { target } = props;

  return (
    <Text className="capitalize cursor-pointer hover:underline">
      {target.status.toLocaleLowerCase()}
    </Text>
  );
}

const SpecialLink = ({ label }: { label: string }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/child-games/details');
  };

  return (
    <button
      onClick={handleRedirect}
      className="hover:underline w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate"
    >
      <Tooltip content={label}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {label}
        </p>
      </Tooltip>
    </button>
  );
};

function TrackingLink(props: { target: ChildGameType }) {
  const { target } = props;
  return (
    <Tooltip content={target.link}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.link}
      </p>
    </Tooltip>
  );
}

export const langColumnDef: ColumnDef<LangCardType>[] = [
  {
    accessorKey: 'lang',
    header: 'Language',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    accessorKey: 'iconUrl',
    cell: ({ row }) => <Icon url={row.original.iconUrl} />,
  },
];

export const childGameColumnDef: ColumnDef<ChildGameType>[] = [
  {
    header: 'Sorting No',
    cell: ({ row }) => {
      return <Text>{row.index + 1}</Text>;
    },
  },
  {
    header: 'Child Game Name',
    accessorKey: 'name',
    cell: ({ row }) => <SpecialLink label={row.original.name} />,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell({ row }) {
      return <Status target={row.original} />;
    },
  },
  {
    header: 'Tracking Link',
    accessorKey: 'link',
    cell({ row }) {
      return <TrackingLink target={row.original} />;
    },
  },
];
