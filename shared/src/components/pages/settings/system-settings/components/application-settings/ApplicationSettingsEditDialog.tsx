'use client';
import React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../ui/dialog';
import { Button } from '../../../../../ui/button';
import { Input } from '../../../../../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import {
  ApplicationSettingData,
  applicationSettingEditSchema,
} from '../../../../../../types/application-settings.types';
import { unitOptions } from '../../../../../../data/UnitList';
import { useUpdateApplicationSettingMutation } from '../../../../../../stores/reducers/application-settings.reducer';
import { useGetLanguageQuery } from '../../../../../../stores/reducers/language.reducer';

type ApplicationForm = z.infer<typeof applicationSettingEditSchema>;
interface ApplicationSettingEditDialogProps {
  data?: ApplicationSettingData;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const ApplicationSettingEditDialog: React.FC<
  ApplicationSettingEditDialogProps
> = ({ data, open, onClose }) => {
  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSettingEditSchema),
    defaultValues: {
      appLockTime: data?.appLockTime,
      unitType: data?.unitType,
      language: data?.language,
      version: data?.version,
      appUrl: data?.appUrl,
    },
  });

  const { data: languageData, isLoading: languageLoading } =
    useGetLanguageQuery();

  const [updateApplicationSetting] = useUpdateApplicationSettingMutation();

  const submit = async (submittedData: ApplicationForm) => {
    try {
      const response = await updateApplicationSetting({ data: submittedData });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
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
        <DialogTitle>Application</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <Flex align="end" className="gap-4">
              <FormField
                control={form.control}
                name="appLockTime"
                render={({ field }) => (
                  <FormItem className="w-2/3">
                    <FormLabel>Account Locked Time</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitType"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ''}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {unitOptions.map((data) => (
                              <SelectItem key={data.value} value={data.value}>
                                {data.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Flex>
            {!languageLoading && (
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ''}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {languageData?.body?.data?.map((data) => (
                              <SelectItem key={data.name} value={data.name}>
                                {data.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Version</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Landing URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="link"
                type="button"
                onClick={() => onClose(false)}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" autoFocus>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
