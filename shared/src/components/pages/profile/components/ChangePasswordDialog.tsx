import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../ui/form';
import { useUpdatePasswordMutation } from '../../../../stores/reducers/auth.reducer';
import { UpdateMeForm } from '../../../../types/auth.types';

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: (result: boolean) => void;
}

const validationSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Old Password is required!' }),
    newPassword: z
      .string()
      .min(6, { message: 'New Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required!' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordForm = z.infer<typeof validationSchema>;

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
}) => {
  const form = useForm<PasswordForm>({
    resolver: zodResolver(validationSchema),
  });

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const resetForm = () => {
    form.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const closeHandler = () => {
    resetForm();
    onClose(false);
  };

  const submit = async (data: PasswordForm) => {
    console.log(data, 'passwords');
    const submittedData: UpdateMeForm = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      const response = await updatePassword(submittedData);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    closeHandler();
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Change Password</DialogTitle>
          <Button
            variant={'link'}
            className="p-0"
            onClick={() => closeHandler()}
          >
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Form {...form}>
          <form
            className="flex flex-col space-y-4 text-xs"
            onSubmit={form.handleSubmit(submit)}
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter old password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter new password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter new password again"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="link"
                type="button"
                onClick={closeHandler}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" autoFocus loading={isLoading}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
