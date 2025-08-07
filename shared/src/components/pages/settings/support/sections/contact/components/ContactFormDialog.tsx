'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../../ui/dialog';
import { Button } from '../../../../../../ui/button';
import { RadioGroup, RadioGroupItem } from '../../../../../../ui/radio-group';
import { Label } from '../../../../../../ui/label';
import { Input } from '../../../../../../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../../ui/form';
import {
  SettingContactListData,
  createSettingContactSchema,
} from '../../../../../../../types/settings-contact.types';
import {
  useCreateSettingContactMutation,
  useUpdateSettingContactMutation,
} from '../../../../../../../stores/reducers/settings-contact.reducer';

type ContactForm = z.infer<typeof createSettingContactSchema>;
interface ContactFormDialogProps {
  data?: SettingContactListData;
  open: boolean;
  title: string;
  onClose: (result: boolean, data?: ContactForm) => void;
  yesLabel?: string;
  noLabel?: string;
}

export const ContactFormDialog: React.FC<ContactFormDialogProps> = ({
  data,
  open,
  title,
  onClose,
  yesLabel = 'Create',
  noLabel = 'No',
}) => {
  const form = useForm<ContactForm>({
    resolver: zodResolver(createSettingContactSchema),
    defaultValues: {
      supportType: data?.supportType,
      address: data?.address,
      isPublish: data?.isPublish ? 'true' : 'false',
    },
  });
  const [createSettingContact, { isLoading: createLoading }] =
    useCreateSettingContactMutation();
  const [updateSettingContact, { isLoading: updateLoading }] =
    useUpdateSettingContactMutation();

  const resetForm = () => {
    form.reset({
      supportType: '',
      address: '',
      isPublish: 'true',
    });
  };

  const submit = async (submittedData: ContactForm) => {
    const dataToSubmit: ContactForm = {
      supportType: submittedData.supportType,
      address: submittedData.address,
      isPublish: submittedData.isPublish === 'true',
    };
    if (data) {
      try {
        const response = await updateSettingContact({
          id: data?.id,
          data: dataToSubmit,
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
    } else {
      try {
        const response = await createSettingContact(dataToSubmit);
        if (response.data?.meta?.success) {
          toast.success(response.data?.meta.message);
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    resetForm();
    onClose(true);
    console.log(dataToSubmit, 'datatosubmit'); // တမင်တကာထည့်ထားတာပါ radio button တွေ error တက်နိုင်လွန်းလို့ server ပေါ် ကနေကြည့်လို့ရအောင်
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle>{title}</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <Box className="space-y-[14px]">
              <FormField
                control={form.control}
                name="supportType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex items-center justify-between"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Box className="w-1/2 flex items-center space-x-2">
                          <RadioGroupItem value="PHONE" id="PHONE" />
                          <Label className="text-xs" htmlFor="PHONE">
                            PHONE
                          </Label>
                        </Box>
                        <Box className="w-1/2 flex items-center space-x-2">
                          <RadioGroupItem value="EMAIL" id="EMAIL" />
                          <Label className="text-xs" htmlFor="EMAIL">
                            EMAIL
                          </Label>
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Box>
            <Box className="space-y-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number/ Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter number/ address" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Box>
            <Box className="space-y-[14px]">
              <FormField
                control={form.control}
                name="isPublish"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Publish?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex items-center justify-between"
                        value={String(field.value)}
                        onValueChange={field.onChange}
                      >
                        <Box className="w-1/2 flex items-center space-x-2">
                          <RadioGroupItem value="true" id="Yes" />
                          <Label className="text-xs" htmlFor="Yes">
                            Yes
                          </Label>
                        </Box>
                        <Box className="w-1/2 flex items-center space-x-2">
                          <RadioGroupItem value="false" id="No" />
                          <Label className="text-xs" htmlFor="No">
                            No
                          </Label>
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Box>
            <DialogFooter>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  onClose(false);
                  resetForm();
                }}
                className="text-gray-700 font-semibold mr-4"
              >
                {noLabel}
              </Button>
              <Button
                type="submit"
                autoFocus
                loading={createLoading || updateLoading}
              >
                {yesLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
