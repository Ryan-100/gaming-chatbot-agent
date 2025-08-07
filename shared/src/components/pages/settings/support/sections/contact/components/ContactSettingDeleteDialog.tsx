'use client';
import React from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../../ui/dialog';
import { Button } from '../../../../../../ui/button';
import { useDeleteSettingContactMutation } from '../../../../../../../stores/reducers/settings-contact.reducer';

interface ContactSettingsDeleteDialogProps {
  id: string;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const ContactSettingsDeleteDialog: React.FC<
  ContactSettingsDeleteDialogProps
> = ({ id, open, onClose }) => {
  const [deleteContactSettings, { isLoading }] =
    useDeleteSettingContactMutation();

  const deleteHandler = async () => {
    try {
      const response = await deleteContactSettings({ id });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
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
          <Button onClick={deleteHandler} autoFocus loading={isLoading}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
