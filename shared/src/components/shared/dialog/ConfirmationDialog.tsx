import React from 'react';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Icons } from '../../ui/icons';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: (result: boolean) => void;
  onSubmit: () => void;
  yesLabel?: string;
  noLabel?: string;
  body?: React.ReactNode;
  yesBtnColor?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onClose,
  onSubmit,
  yesLabel = 'Yes',
  noLabel = 'No',
  body,
  yesBtnColor,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex justify={'between'} align={'center'} className="gap-2">
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
        {body}
        <DialogFooter>
          <Button
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            {noLabel}
          </Button>
          <Button
            onClick={() => {
              onSubmit();
              onClose(false);
            }}
            autoFocus
            className={`bg-${yesBtnColor}`}
          >
            {yesLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
