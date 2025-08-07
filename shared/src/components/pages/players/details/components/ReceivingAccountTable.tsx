import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../../../components/shared';
import { PlayerReceivingAccountData } from '../../../../../types/player.types';
import { Tooltip } from '@radix-ui/themes';

const columnDef: ColumnDef<PlayerReceivingAccountData>[] = [
  {
    accessorKey: 'accountName',
    header: 'Receiving Account',
    cell: ({ row }) => (
      <Tooltip content={row.original?.accountName}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {row.original?.accountName}
        </p>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'accountnumber',
    header: 'Number',
    cell: ({ row }) => (
      <Tooltip content={row.original?.accountnumber}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {row.original?.accountnumber}
        </p>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => row.original?.PaymentCategory?.accountType,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <p className="capitalize">{row.original?.status?.toLocaleLowerCase()}</p>
    ),
  },
];

const ReceivingAccountTable = (props: {
  data: PlayerReceivingAccountData[];
}) => {
  return <DataTable data={props.data} columns={columnDef} />;
};

export default ReceivingAccountTable;
