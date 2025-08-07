'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { Flex, Box, Text } from '@radix-ui/themes';
import { Input } from '../../../../ui/input';
import { Icons } from '../../../../ui/icons';
import { useForm } from 'react-hook-form';
import {
  UpdateSpinSettingForm,
  updateSpinSettingSchema,
  SpinSettingData,
} from '../../../../../types/spin-setting.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../ui/button';
import { useUpdateSpinSettingMutation } from '../../../../../stores/reducers/spin-setting.reducer';
import { toast } from 'sonner';

const unitOptions = [
  {
    label: 'DAYS',
    value: 'DAYS',
  },
  {
    label: 'HOURS',
    value: 'HOURS',
  },
  {
    label: 'MINUTES',
    value: 'MINUTES',
  },
];

interface UpdateSpinSettingModalProps {
  open: boolean;
  handleClose: () => void;
  data?: SpinSettingData;
}

const defaultData: UpdateSpinSettingForm = {
  winChance: 0,
  maxSpinLimit: 0,
  bonusExpireDate: 0,
  turnOverRate: 0,
  bonusExpireType: 'DAYS',
};

const UpdateSpinSettingDialog: React.FC<UpdateSpinSettingModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const parsedData = updateSpinSettingSchema.parse(data ? data : defaultData);

  const form = useForm<UpdateSpinSettingForm>({
    resolver: zodResolver(updateSpinSettingSchema),
    defaultValues: data && parsedData,
  });

  const [updateSpinSetting] = useUpdateSpinSettingMutation();

  const submit = async (submittedData: UpdateSpinSettingForm) => {
    const dataToSend = {
      ...submittedData,
    }; // nothing to transform but i wrote this to be consistent

    try {
      const response = await updateSpinSetting({
        data: dataToSend,
      });
      if (response.data?.meta?.success) {
        toast('Successfully updated Spin Setting');
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent widthSize="sm" className="w-fit md:min-w-[480px]">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle> Edit Spin Settings </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={handleClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>

        <Box>
          <Form {...form}>
            <form
              className="flex flex-col gap-3 pt-6"
              onSubmit={form.handleSubmit(submit)}
            >
              <Flex align={'end'}>
                <FormField
                  control={form.control}
                  name="winChance"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> Winning Chance </FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(parseInt(event.target.value))
                          }
                          type="number"
                          placeholder="Enter Winning Chance"
                          postfix={<Text className="text-sm">%</Text>}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="ml-[-28px] mb-[6px] w-7 "> % </div>
              </Flex>

              <Flex align={'end'} gap={'3'}>
                <FormField
                  control={form.control}
                  name="maxSpinLimit"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> Maximun Spin Limit </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(parseInt(event.target.value))
                          }
                          placeholder="Enter Maximun Spin Limit"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Flex>

              <Flex align={'end'} className="gap-3">
                <FormField
                  control={form.control}
                  name="bonusExpireDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> Bonus Expire Time </FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(parseInt(event.target.value))
                          }
                          type="number"
                          placeholder="Enter Bonus Expire Time"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bonusExpireType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="w-full md:w-[110px]">
                            <SelectValue placeholder="Select Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {unitOptions.map((item, index) => (
                                <SelectItem key={index} value={item.value}>
                                  {' '}
                                  {item.label}{' '}
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

              <Flex align={'end'}>
                <FormField
                  control={form.control}
                  name="turnOverRate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> Turnover Rate </FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(parseInt(event.target.value))
                          }
                          type="number"
                          placeholder="Enter Turnover Rate"
                          postfix={<Text className="text-sm">X</Text>}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="ml-[-28px] mb-[6px] w-7 "> X </div>
              </Flex>

              <Flex justify={'end'} align={'center'} className="gap-x-4">
                <Button
                  variant={'outline'}
                  onClick={() => {
                    handleClose();
                    form.reset();
                  }}
                  type="button"
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={!form?.formState?.isValid}>
                  Update
                </Button>
              </Flex>
            </form>
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSpinSettingDialog;
