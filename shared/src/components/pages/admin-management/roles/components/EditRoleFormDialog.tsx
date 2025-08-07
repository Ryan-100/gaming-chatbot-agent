'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import MultiSelect from '../../../../ui/multi-select';
import {
  EditRoleForm,
  editRoleSchema,
  RoleListData,
} from '../../../../../types/roles.types';
import { PermissionListData } from '../../../../../types/permissions.types';
import { useGetPermissionsQuery } from '../../../../../stores/reducers/permissions.reducers';
import { IOptions } from '../../../../../types/base.types';
import { useUpdateRoleMutation } from '../../../../../stores/reducers/roles.reducer';
interface EditRoleFormDialogProps {
  data?: RoleListData;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const EditRoleFormDialog: React.FC<EditRoleFormDialogProps> = ({
  data,
  open,
  onClose,
}) => {
  const form = useForm<EditRoleForm>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      name: data?.name,
      permissionList: data?.RoleOnPermission.map((permission) => ({
        value: permission.Permission.id,
        label: permission.Permission.name,
      })),
    },
  });

  const { data: permissionData } = useGetPermissionsQuery();

  const [eidtRole, { isLoading: formSubmitting }] = useUpdateRoleMutation();

  const resetForm = () => {
    form.reset({
      name: '',
      permissionList: [],
    });
  };

  const submit = async (formData: EditRoleForm) => {
    const dataToSubmit: EditRoleForm = {
      name: formData.name,
      permissionList: formData.permissionList.map(
        (permission) => permission.value
      ) as string[],
    };
    try {
      const response = await eidtRole({
        id: data?.id ?? '',
        data: dataToSubmit,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
                  const errorResponse:any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    resetForm();
    onClose(true);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Edit Role & Permission</DialogTitle>
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
                onClick={() => onClose(false)}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" autoFocus loading={formSubmitting} disabled={!form?.formState?.isValid}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
