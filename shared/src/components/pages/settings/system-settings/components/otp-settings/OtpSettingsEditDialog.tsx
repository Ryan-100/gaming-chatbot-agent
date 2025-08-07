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
  OtpSettingData,
  otpSettingEditSchema,
} from '../../../../../../types/otp-settings.types';
import { unitOptions } from '../../../../../../data/UnitList';
import { useUpdateOtpSettingMutation } from '../../../../../../stores/reducers/otp-settings.reducer';
type OtpForm = z.infer<typeof otpSettingEditSchema>;

interface OtpSettingEditDialogProps {
  data?: OtpSettingData;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const OtpSettingEditDialog: React.FC<OtpSettingEditDialogProps> = ({
  data,
  open,
  onClose,
}) => {
  const form = useForm<OtpForm>({
    resolver: zodResolver(otpSettingEditSchema),
    defaultValues: {
      maxAttemptOtp: data?.maxAttemptOtp,
      maxWrongOtp: data?.maxWrongOtp,
      maxWrongPsw: data?.maxWrongPsw,
      otpExpireTime: data?.otpExpireTime,
      otpExpireType: data?.otpExpireType,
      otpLockTime: data?.otpLockTime,
      otpLockType: data?.otpLockType,
    },
  });

  const [updateOtpSetting] = useUpdateOtpSettingMutation();

  const submit = async (submittedData: OtpForm) => {
    try {
      const response = await updateOtpSetting({ data: submittedData });
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
        <DialogTitle>Otp</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <FormField
              control={form.control}
              name="maxAttemptOtp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Attempt Otp</FormLabel>
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
              name="maxWrongOtp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Wrong Otp</FormLabel>
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
              name="maxWrongPsw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Wrong Password</FormLabel>
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

            <Flex align="center" className="gap-4">
              <FormField
                control={form.control}
                name="otpExpireTime"
                render={({ field }) => (
                  <FormItem className="w-2/3">
                    <FormLabel>Otp Expired Time</FormLabel>
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
                name="otpExpireType"
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
            <Flex align="center" className="gap-4">
              <FormField
                control={form.control}
                name="otpLockTime"
                render={({ field }) => (
                  <FormItem className="w-2/3">
                    <FormLabel>Otp Locked Time</FormLabel>
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
                name="otpLockType"
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
