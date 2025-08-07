import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import PropsTable from '../../../../shared/PropsTable';
import { Box } from '@radix-ui/themes';
import { PaymentManagementListData } from '../../../../../types/payment-management.types';
import { Flex } from '@radix-ui/themes';
import Image from 'next/image';

interface PaymentManagementDetailsDialogProps {
  data: PaymentManagementListData;
  open: boolean;
  onClose: () => void;
}

export const PaymentManagementDetailsDialog: React.FC<
  PaymentManagementDetailsDialogProps
> = ({ data, open, onClose }) => {
  const propsTable = (
    <PropsTable
      rows={[
        {
          key: 'Account Type',
          value: data?.PaymentCategory?.accountType,
        },
        {
          key: 'Account Name',
          value: data.accountName || '',
        },
        {
          key: data?.CryptoNetwork ? 'Network Address' : 'Account No.',
          value: data.accountNumber,
        },
        {
          key: 'Player Level',
          value: data?.PlayerLevel?.name,
        },
        {
          key: 'Maximum Limit Amount',
          value: data?.accountLimit,
        },
        {
          key: 'Is Publish?',
          value: data.isPublish ? 'Yes' : 'No',
        },
        {
          key: 'Screenshot Require?',
          value: data.ssRequired ? 'Yes' : 'No',
        },
        {
          key: 'Show QR?',
          value: data.ssRequired ? 'Yes' : 'No',
        },
        {
          key: 'QR Code',
          value: (
            <Box>
              {/* <Image
                src={data.imageUrl}
                width={200}
                height={200}
                alt="App Icon"
              /> */}
            </Box>
          ),
        },
      ]}
    />
  );

  return (
    <Dialog open={open}>
      <DialogContent className="py-0">
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

        {propsTable}

        <Flex justify={'center'} align={'center'}>
          <Image
            src={data?.Image?.url || ''}
            width={200}
            height={200}
            alt="Payment image"
            className="object-cover"
          />
        </Flex>

        <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
          <Button onClick={onClose} color="primary" className="w-[65px]">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
