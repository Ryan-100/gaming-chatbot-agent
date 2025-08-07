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
import { Icons } from '../../../../ui/icons';
import { useDeleteHotGameMutation } from '../../../../../stores/reducers/hot-games.reducer';
import { Flex } from '@radix-ui/themes';

interface DeleteHotGameProps {
  id: number;
  open: boolean;
  onClose: () => void;
}

export const DeleteHotGameDialog: React.FC<DeleteHotGameProps> = ({
  id,
  open,
  onClose,
}) => {
  const [deleteHotGame, { isLoading }] = useDeleteHotGameMutation();

  const deleteHandler = async () => {
    try {
      const response = await deleteHotGame({ id });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Remove From Hot Game</DialogTitle>
          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <p className="text-xs">
          Are you sure you want to remove from hot game?
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="link"
            onClick={onClose}
            className="text-gray-700 font-semibold mr-4"
          >
            Cancel
          </Button>
          <Button onClick={deleteHandler} autoFocus loading={isLoading}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
