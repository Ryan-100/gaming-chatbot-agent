import React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Icons } from '../../../ui/icons';
import PropsTable from '../../../shared/PropsTable';
import { formatNumber } from '../../../../utils/formatNumber';
import { useGetPMDetailsQuery } from '../../../../stores/reducers/pocket-money.reducer';
import Loading from '../../../ui/loading';
import dayjs from '../../../../utils/dayjs';
import { cn } from '../../../../utils/cn';

interface DetailsDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  status: 'Active' | 'Upcoming' | 'Expired';
}

export const DetailsDialog: React.FC<DetailsDialogProps> = ({
  id,
  open,
  onClose,
  status,
}) => {
  const response = useGetPMDetailsQuery({ id });

  const data = response?.data?.body?.data;
  const isLoading = response?.isLoading;
  const initialTableData = [
    {
      key: 'ID',
      enableCopy: true,
      value: data?.id,
    },
    {
      key: 'Title',
      value: data?.title,
    },
    {
      key: 'Status',
      value: (
        <Text
          className={cn(
            status === 'Active' && 'text-text-success',
            status === 'Expired' && 'text-text-error',
            status === 'Upcoming' && 'text-surface-link'
          )}
        >
          {status}
        </Text>
      ),
    },
    {
      key: 'Pocket Money Propability',
      value: data?.type,
    },
    {
      key: 'Total Claimed Count',
      value: data?.countClaimed,
    },
    {
      key: 'Total Remaining Count',
      value: data?.countRemained,
    },
    {
      key: 'Total Claimed Amount',
      value: <Text>{formatNumber(data?.totalClaimed)}</Text>,
    },
    {
      key: 'Total Remaining Amount',
      value: <Text>{formatNumber(data?.totalRemained)}</Text>,
    },
    {
      key: 'Pocket Money Period: Start Date',
      value: dayjs(data?.startDate).format('MMM DD, YYYY'),
    },
    {
      key: 'Pocket Money Period: End Date',
      value: dayjs(data?.endDate).format('MMM DD, YYYY'),
    },
    {
      key: 'Pocket Money Reward Will Be Expired After',
      value: `${data?.expireTime} ${data?.expireType}`,
    },
    {
      key: 'After Turnover Rate',
      value: `${data?.turnOverRate} X`,
    },
  ];
  const [tableData, setTableData] = React.useState(initialTableData);

  React.useEffect(() => {
    if (data) {
      const newTableData = [...initialTableData]; // Clone the initial table data

      if (data.playerType === 'LEVEL' && data?.levelIds?.length > 0) {
        const userLevels = {
          key: 'User Levels',
          value: (
            <Flex direction="column" className="space-y-2">
              {data?.levelIds.map((level, index) => (
                <Text key={index}>{level?.name}</Text>
              ))}
            </Flex>
          ),
        };

        // Insert at index 4
        newTableData.splice(4, 0, userLevels);
      }

      if (data.playerType === 'PLAYER' && data?.playerIds?.length > 0) {
        const playerData = {
          key: 'Player',
          value: (
            <Flex direction="column" className="space-y-2">
              {data?.playerIds.map((player, index) => (
                <p className="font-semibold">
                  {index + 1}.{player?.name}
                </p>
              ))}
            </Flex>
          ),
        };

        // Insert at index 4
        newTableData.splice(4, 0, playerData);
      }

      setTableData(newTableData); // Update the table data once with the new array
    }
  }, [data]); // Only depend on `data`

  return (
    <Dialog open={open}>
      <DialogContent className="py-0 w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle> Detail </DialogTitle>
          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        {isLoading ? <Loading /> : <PropsTable rows={tableData} />}
        <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4">
          <Button onClick={onClose} color="primary">
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
