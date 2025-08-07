import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';

interface UserUnblockDialogProps {
  open: boolean;
  title: string;
  message: string;
  isLoading?: boolean;
  onClose: (result: boolean) => void;
  onSubmit: () => void;
}

export const UserUnblockDialog: React.FC<UserUnblockDialogProps> = ({
  open,
  title,
  message,
  isLoading,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle>{title}</DialogTitle>
        {message}
        <DialogFooter>
          <Button
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit();
              onClose(false);
            }}
            autoFocus
            loading={isLoading}
          >
            Unblock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
