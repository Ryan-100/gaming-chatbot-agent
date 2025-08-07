import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';

interface SuccessDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  yesLabel?: string;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  title,
  children,
  yesLabel = 'OK',
  onClose,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {children}
        <DialogFooter>
          <Button onClick={onClose} color="primary">
            {yesLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
