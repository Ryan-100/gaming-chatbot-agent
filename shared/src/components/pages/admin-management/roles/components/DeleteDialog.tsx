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
import { useDeleteRoleMutation } from '../../../../../stores/reducers/roles.reducer';

interface RoleDeleteDialogProps {
  id: string;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const RoleDeleteDialog: React.FC<RoleDeleteDialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const [deleteRole, { isLoading }] = useDeleteRoleMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteRole({
        id,
      });
      if (response.data?.meta?.success) {
        toast('Successfully updated player level');
      } else {
                  const errorResponse:any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.log(error);
    }
    onClose(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Delete</DialogTitle>
        Are you sure you want to delete this category?
        <DialogFooter>
          <Button
            type="button"
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus loading={isLoading}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
