'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';

interface CancelNotiCreateDialogProps {
  open: boolean;
  onClose: (result: boolean) => void;
}

export const CancelNotiCreateDialog: React.FC<CancelNotiCreateDialogProps> = ({
  open,
  onClose,
}) => {
  const router = useRouter();

  const handleCancelCreateNoti = () => {
    router.push(`/notification`);
    onClose(true);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Exit</DialogTitle>
        <DialogDescription>
          Are you sure to want to exit without creating?
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            No
          </Button>
          <Button onClick={handleCancelCreateNoti} autoFocus>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
