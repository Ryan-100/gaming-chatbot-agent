'use client';
import React from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { useUpdateNotificationPinMutation } from '../../../../stores/reducers/notification.reducer';

interface PinNotiDialogProps {
  id: string;
  isPinned: boolean;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const PinNotiDialog: React.FC<PinNotiDialogProps> = ({
  id,
  isPinned,
  open,
  onClose,
}) => {
  const [updateNotificationPin, { isLoading }] =
    useUpdateNotificationPinMutation();

  const handleUpdatePin = async () => {
    try {
      const response = await updateNotificationPin({
        id,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    onClose(true);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>{`${
          isPinned ? 'Unpin' : 'Pin'
        } Notification`}</DialogTitle>
        <DialogDescription>{`Would you like to ${
          isPinned ? 'unpin' : 'pin'
        } this notification?`}</DialogDescription>
        <DialogFooter>
          <Button
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdatePin} loading={isLoading} autoFocus>
            {`${isPinned ? 'Unpin' : 'Pin'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
