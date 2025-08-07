import React from 'react';
import dayjs from '../../../../../../utils/dayjs';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../ui/dialog';
import Loading from '../../../../../ui/loading';
import { Icons } from '../../../../../ui/icons';
import { Button } from '../../../../../ui/button';
import PropsTable from '../../../../../shared/PropsTable';
import { useGetReportWithdrawAdminTransactionQuery } from '../../../../../../stores/reducers/report-withdraw-admin.reducer';

interface ModalProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

export const DetailsModal = ({ id, open, onClose }: ModalProps) => {
  const { data, isLoading } = useGetReportWithdrawAdminTransactionQuery(id);
  const DetailData = data?.body?.data;

  const propsTable = (
    <PropsTable
      rows={[
        {
          key: 'Username',
          value: DetailData?.Player?.name,
        },
        {
          key: 'Phone/ Email',
          value: `${DetailData?.Player?.phone ?? DetailData?.Player?.email}`,
        },
        {
          key: 'Updated Date',
          value: `${
            DetailData?.updatedAt
              ? dayjs(DetailData?.updatedAt).format('DD MMM YYYY, h:mm A')
              : '-'
          }`,
        },
      ]}
    />
  );

  return (
    <Dialog open={open}>
      <DialogContent>
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Detail</DialogTitle>
          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        {isLoading ? <Loading /> : propsTable}
        <DialogFooter>
          <Button onClick={onClose} color="primary">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
