'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import { Icons } from '../../../../ui/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import MultiSelect from '../../../../ui/multi-select';
import {
  CreateRoleForm,
  createRoleSchema,
} from '../../../../../types/roles.types';
import { PermissionListData } from '../../../../../types/permissions.types';
import { useGetPermissionsQuery } from '../../../../../stores/reducers/permissions.reducers';
import { IOptions } from '../../../../../types/base.types';
import { useCreateRoleMutation } from '../../../../../stores/reducers/roles.reducer';
interface CreateRoleFormDialogProps {
  open: boolean;
  onClose: (result: boolean) => void;
}

export const CreateRoleFormDialog: React.FC<CreateRoleFormDialogProps> = ({
  open,
  onClose,
}) => {
  const form = useForm<CreateRoleForm>({
    resolver: zodResolver(createRoleSchema),
  });

  const { data: permissionData } = useGetPermissionsQuery();

  const [createRole, { isLoading: formSubmitting }] = useCreateRoleMutation();

  const resetForm = () => {
    form.reset({
      name: '',
      permissionList: [],
    });
  };
  const closeHandler = () => {
    resetForm();
    onClose(false);
  };

  const submit = async (data: CreateRoleForm) => {
    const dataToSubmit: CreateRoleForm = {
      name: data.name,
      permissionList: data.permissionList.map(
        (permission) => permission.value
      ) as string[],
    };
    try {
      const response = await createRole(dataToSubmit);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
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
          <DialogTitle>Create New Role & Permission</DialogTitle>
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
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permissionList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permissions</FormLabel>
                  <FormControl>
                    <MultiSelect
                      data={
                        permissionData?.body
                          ? permissionData.body.data.map(
                              (permission: PermissionListData) => ({
                                value: permission.id,
                                label: permission.name,
                              })
                            )
                          : []
                      }
                      value={field.value as IOptions[]}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="link"
                onClick={() => closeHandler()}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                autoFocus
                loading={formSubmitting}
                disabled={!form?.formState?.isValid}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
