import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

const DeleteSpinBonusDialog: React.FC<DeleteDialogProps> = ({
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
            onClick={() => onClose()}
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

export default DeleteSpinBonusDialog;
