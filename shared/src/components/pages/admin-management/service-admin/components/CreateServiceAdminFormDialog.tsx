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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import Loading from '../../../../ui/loading';
import {
  CreateServiceAdminForm,
  createServiceAdminSchema,
} from '../../../../../types/service-admin.types';
import { useGetRolesQuery } from '../../../../../stores/reducers/roles.reducer';
import { useCreateServiceAdminMutation } from '../../../../../stores/reducers/service-admin.reducer';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Label } from '../../../../ui/label';

interface CreateServiceAdminFormDialogProps {
  open: boolean;
  onClose: (result: boolean, data?: CreateServiceAdminForm) => void;
}

export const CreateServiceAdminFormDialog: React.FC<
  CreateServiceAdminFormDialogProps
> = ({ open, onClose }) => {
  const form = useForm<CreateServiceAdminForm>({
    resolver: zodResolver(createServiceAdminSchema),
    defaultValues: {
      isActive: true
    }
  });

  const { data: RoleData, isLoading: dataFetching } = useGetRolesQuery({});

  const [createServiceAdmin, { isLoading: formSubmitting }] =
    useCreateServiceAdminMutation();

  const resetForm = () => {
    form.reset({
      name: '',
      phone: '',
      password: '',
    });
  };

  const closeHandler = () => {
    resetForm();
    onClose(false);
  };

  const submit = async (data: CreateServiceAdminForm) => {
    const dataToSubmit: CreateServiceAdminForm = {
      ...data,
      roleId:
        RoleData?.body?.data?.find((role) => role.name === 'Service Admin')
          ?.id ?? '',
      isActive: data.isActive,
      
    };
    try {
      const response = await createServiceAdmin(dataToSubmit);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
                  const errorResponse:any = response;
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
          <DialogTitle>Create Service Admin</DialogTitle>
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
                    <Input {...field} placeholder="Enter phone number"
                      type="number"
                     />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
