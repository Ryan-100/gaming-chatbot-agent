import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../../components/shared/data-table';
import { AdminLoginListData } from '../../../../types/auth.types';
import { Text } from '@radix-ui/themes';
import dayjs from '../../../../utils/dayjs';

function Status(props: { target: AdminLoginListData }) {
  const { target } = props;
  return <Text className="capitalize">{target.status.toLowerCase()}</Text>;
}
function DateTime(props: { target: AdminLoginListData }) {
  const { target } = props;
  return (
    <Text className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </Text>
  );
}
const LoginActivityTable = (props: { data: AdminLoginListData[] }) => {
  const columnDef: ColumnDef<AdminLoginListData>[] = [
    {
      accessorKey: 'device',
      header: 'Device',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'createdAt',
      header: 'Date & Time',
      cell({ row }) {
        return <DateTime target={row.original} />;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell({ row }) {
        return <Status target={row.original} />;
      },
    },
  ];
  return <DataTable data={props.data} columns={columnDef} />;
};

export default LoginActivityTable;
