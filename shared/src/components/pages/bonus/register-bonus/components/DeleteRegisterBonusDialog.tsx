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
import { useDeleteRegisterBonusMutation } from '../../../../../stores/reducers/bonus.reducer';

interface DeleteRegisterBonusDialogProps {
  id: string;
  open: boolean;
  onClose: (result: boolean) => void;
  onCloseTwoSteps: () => void;
}

export const DeleteRegisterBonusDialog: React.FC<
  DeleteRegisterBonusDialogProps
> = ({ id, open, onClose, onCloseTwoSteps }) => {
  const [deleteRegisterBonus, { isLoading }] = useDeleteRegisterBonusMutation();

  const deleteHandler = async () => {
    try {
      const response = await deleteRegisterBonus({ id });
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
        Are you sure you want to delete this register bonus?
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
