'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';

interface SettingsDeleteDialogProps {
  open: boolean;
  onClose: (result: boolean) => void;
  onDelete?: () => void;
}

export const SettingsDeleteDialog: React.FC<SettingsDeleteDialogProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle>Delete</DialogTitle>
        Are you sure you want to delete?
        <DialogFooter>
          <Button
            type="button"
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            Cancel
          </Button>
          <Button onClick={onDelete} autoFocus>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
