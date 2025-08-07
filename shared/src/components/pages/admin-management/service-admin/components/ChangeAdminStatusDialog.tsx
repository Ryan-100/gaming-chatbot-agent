'use client';
import React from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Flex, Text } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import { useChangeStatusServiceAdminMutation } from '../../../../../stores/reducers/service-admin.reducer';

interface ChangeAdminStatusDialogProps {
  id: string;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const ChangeAdminStatusDialog: React.FC<
  ChangeAdminStatusDialogProps
> = ({ id, open, onClose }) => {
  const [changeStatusServiceAdmin, { isLoading }] =
    useChangeStatusServiceAdminMutation();

  const submitHandler = async () => {
    try {
      const response = await changeStatusServiceAdmin({ id });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
                  const errorResponse:any = response;
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
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Change Status</DialogTitle>
          <Button
            variant={'link'}
            className="p-0"
            onClick={() => onClose(false)}
          >
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Text className="text-secondary text-xs">
          Are you sure to change Service Admin Status?
        </Text>
        <DialogFooter>
          <Button
            variant="link"
            onClick={() => {
              onClose(false);
            }}
            className="text-gray-700 font-semibold mr-4"
          >
            No
          </Button>
          <Button onClick={submitHandler} autoFocus loading={isLoading}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
