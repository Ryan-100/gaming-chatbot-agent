'use client';
import React from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { useDeleteFirstTimeDepositBonusMutation } from '../../../../../stores/reducers/bonus.reducer';

interface DeleteFirstTimeDepositBonusDialogProps {
  id: string;
  open: boolean;
  onClose: (result: boolean) => void;
  onCloseTwoSteps: () => void;
}

export const DeleteFirstTimeDepositBonusDialog: React.FC<
  DeleteFirstTimeDepositBonusDialogProps
> = ({ id, open, onClose, onCloseTwoSteps }) => {
  const [deleteFirstTimeDepositBonus, { isLoading }] =
    useDeleteFirstTimeDepositBonusMutation();

  const deleteHandler = async () => {
    try {
      const response = await deleteFirstTimeDepositBonus({ id });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        onCloseTwoSteps();
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    onClose(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Delete?</DialogTitle>
        Are you sure you want to delete this first time deposit bonus?
        <DialogFooter>
          <Button
            type="button"
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            Cancel
          </Button>
          <Button onClick={deleteHandler} autoFocus loading={isLoading}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
