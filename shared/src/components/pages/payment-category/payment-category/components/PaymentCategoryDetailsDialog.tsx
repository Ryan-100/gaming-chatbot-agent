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
import { PaymentCategoryListData } from '../../../../../types/payment-category.types';
import { Flex } from '@radix-ui/themes';
import Image from 'next/image';

interface PaymentCategoryDetailsDialogProps {
  data: PaymentCategoryListData;
  open: boolean;
  onClose: () => void;
}

export const PaymentCategoryDetailsDialog: React.FC<
  PaymentCategoryDetailsDialogProps
> = ({ data, open, onClose }) => {
  const propsTable = (
    <PropsTable
      rows={[
        {
          key: 'Account Type',
          value: data?.accountType,
        },
        {
          key: 'Category',
          value: data?.PaymentType?.name || '',
        },
        {
          key: 'Trx Num Digit',
          value: data?.transactionDigitCount || '',
        },
        {
          key: 'Is Publish?',
          value: data?.isPublish ? 'Yes' : 'No',
        },
        // {
        //   key: 'Show QR?',
        //   value: data?.showQR ? 'Yes' : 'No',
        // },
      ]}
    />
  );

  return (
    <Dialog open={open}>
      <DialogContent>
        <Flex justify={"between"} align={"center"} >
          <DialogTitle> Detail </DialogTitle>

          <Button
            variant={"link"}
            className='p-0'
            onClick={onClose}
          >
            <Icons.Cross
              className="w-6 h-6 text-black"
            />
          </Button>
        </Flex>

        {propsTable}

        <Flex justify={'center'} align={"center"}>
          <Image 
            src={data?.File?.url || ""}
            width={200}
            height={200}
            alt="category image"
            className='object-cover'
          />
        </Flex>

        <DialogFooter>
          <Button 
            onClick={onClose} 
            color="primary"
            className='w-[65px]'
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
