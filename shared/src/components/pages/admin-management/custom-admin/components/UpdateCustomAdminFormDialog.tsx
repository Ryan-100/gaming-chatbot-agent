'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Flex, Box } from '@radix-ui/themes';
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import Loading from '../../../../ui/loading';
import {
  CustomAdminListData,
  UpdateCustomAdminForm,
  updateCustomAdminSchema,
} from '../../../../../types/custom-admin.types';
import { useGetRolesQuery } from '../../../../../stores/reducers/roles.reducer';
import { useUpdateCustomAdminMutation } from '../../../../../stores/reducers/custom-admin.reducer';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Label } from '../../../../ui/label';
import { ChangePassDialog } from '../../../../shared/dialog/ChangePassDialog';

interface UpdateCustomAdminFormDialogProps {
  data: CustomAdminListData;
  open: boolean;
  onClose: (result: boolean, data?: UpdateCustomAdminForm) => void;
}

export const UpdateCustomAdminFormDialog: React.FC<
  UpdateCustomAdminFormDialogProps
> = ({ data, open, onClose }) => {
  const form = useForm<UpdateCustomAdminForm>({
    resolver: zodResolver(updateCustomAdminSchema),
    defaultValues: {
      name: data.name,
      phone: data.phone,
      roleId: data.Role.id,
      isActive: data?.AdminStatus === 'ACTIVE',
    },
  });

  const { data: RoleData, isLoading: dataFetching } = useGetRolesQuery({});

  const [updateCustomAdmin, { isLoading: formSubmitting }] =
    useUpdateCustomAdminMutation();

  const resetForm = () => {
    form.reset({
      name: '',
      phone: '',
      password: '',
      roleId: '',
    });
  };

  const closeHandler = () => {
    resetForm();
    onClose(false);
  };

  const submit = async (submittedData: UpdateCustomAdminForm) => {
    try {
      const response = await updateCustomAdmin({
        id: data.id,
        data: submittedData,
      });
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

  const handlerChangePass = async (password: string) => {
    const adminData: UpdateCustomAdminForm = {
      isActive: data?.AdminStatus === 'ACTIVE',
      name: data?.name,
      phone: data?.phone,
      roleId: data.Role.id,
      password: password,
    };

    try {
      const response = await updateCustomAdmin({
        id: data.id,
        data: adminData,
      });
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

  if (dataFetching) {
    return <Loading />;
  }

  return (
    <Dialog open={open}>
      <DialogContent>
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Edit Custom Admin</DialogTitle>
          <Button
            variant={'link'}
            className="p-0"
            onClick={() => closeHandler()}
          >
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <ChangePassDialog onSubmit={handlerChangePass} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex items-center justify-between"
                      value={String(field.value)}
                      onValueChange={(value) =>
                        field.onChange(value === 'true')
                      }
                    >
                      <Box className="w-1/2 flex items-center space-x-2">
                        <RadioGroupItem value="true" id="Yes" />
                        <Label className="text-xs" htmlFor="Yes">
                          Active
                        </Label>
                      </Box>
                      <Box className="w-1/2 flex items-center space-x-2 justify-start">
                        <RadioGroupItem value="false" id="No" />
                        <Label className="text-xs" htmlFor="No">
                          Inactive
                        </Label>
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter admin name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter phone number"
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Password"
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {RoleData?.body?.data?.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                disabled={!form.formState.isValid}
              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
