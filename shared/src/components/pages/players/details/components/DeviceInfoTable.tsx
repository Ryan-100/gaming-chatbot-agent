import { z } from 'zod';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../../../components/shared';
import { Tooltip } from '@radix-ui/themes';

const playerDeviceInfoSchema = z.object({
  device: z.string(),
  ipAddress: z.string(),
  location: z.string(),
});
type PlayerDeviceInfo = z.infer<typeof playerDeviceInfoSchema>;

const DeviceInfoTable = (props: { data: PlayerDeviceInfo[] }) => {
  const columnDef: ColumnDef<PlayerDeviceInfo>[] = [
    {
      accessorKey: 'device',
      header: 'Device Info',
      cell: ({ row }) => (
        <Tooltip content={row.original.device}>
          <p className="w-32 max-w-32 lg:w-36 lg:max-w-36 xl:w-60 xl:max-w-60 truncate">
            {row.original.device}
          </p>
        </Tooltip>
      ),
    },
    {
      accessorKey: 'ipAddress',
      header: 'IP Address',
      cell: ({ row }) => (
        <Tooltip content={row.original.ipAddress}>
          <p className="w-32 max-w-32 lg:w-36 lg:max-w-36 xl:w-60 xl:max-w-60 truncate">
            {row.original.ipAddress}
          </p>
        </Tooltip>
      ),
    },
  ];
  return <DataTable data={props.data} columns={columnDef} />;
};

export default DeviceInfoTable;
