import React from 'react';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../ui/dialog';
import { Icons } from '../../../ui/icons';
import { Button } from '../../../ui/button';

interface AcceptTransactionDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: (result: boolean) => void;
}

export const AcceptTransactionDialog: React.FC<
  AcceptTransactionDialogProps
> = ({ open, title, message, onClose }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>{title}</DialogTitle>
          <Button
            variant={'link'}
            className="p-0"
            onClick={() => onClose(false)}
          >
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        {message}
        <DialogFooter>
          <Button
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            Cancel
          </Button>
          <Button onClick={() => onClose(true)} autoFocus variant={'success'}>
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
