'use client';
import React from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import { Box, Flex, Text } from '@radix-ui/themes';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../../ui/input';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import { RadioGroup, RadioGroupItem } from '../../../../../ui/radio-group';
import { Label } from '../../../../../ui/label';
import Loading from '../../../../../ui/loading';
import {
  ChildGameDetailData,
  ChildGameListData,
  UpdateChildGameForm,
  updateChildGameSchema,
} from '../../../../../../types/child-games.types';
import { useCreateFileMutation } from '../../../../../../stores/reducers/file-upload.reducer';
import { useUpdateChildGameMutation } from '../../../../../../stores/reducers/child-games.reducer';

interface DialogProps {
  data: ChildGameDetailData | ChildGameListData;
  open: boolean;
  handleClose: () => void;
}

// Define allowed image MIME types

type GameType = z.infer<typeof updateChildGameSchema>;

const ChildGameEditModal = ({ data, open, handleClose }: DialogProps) => {
  const [createImage, { isLoading: fileUploading }] = useCreateFileMutation();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    let fileUrl;
    if (file) {
      try {
        const response = await createImage({ file });
        if (response?.data?.meta?.success) {
          toast(`Successfully 'uploaded' image`);
          fileUrl = response?.data?.body?.data?.url;
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        toast(`Error: ${error}`);
        return;
      }
    }
    return fileUrl;
  };

  const form = useForm<GameType>({
    resolver: zodResolver(updateChildGameSchema),
    defaultValues: {
      id: data?.id,
      sorting: data?.sorting,
      game_name_en: data?.game_name_en,
      game_name_mm: data?.game_name_mm,
      game_name_zh: data?.game_name_zh,
      icon_en: data?.icon_en,
      icon_mm: data?.icon_mm,
      icon_zh: data?.icon_zh,
      is_active: data?.is_active ? 'true' : 'false',
    },
  });

  const [updateChildGame] = useUpdateChildGameMutation();

  const submit = async (submittedData: UpdateChildGameForm) => {
    try {
      const response = await updateChildGame({
        data: {
          ...submittedData,
          is_active: submittedData?.is_active === 'true',
        },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        handleClose();
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log('error', form.formState.errors);

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px] py-0">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle>Edit Child Game</DialogTitle>
          <Button variant={'link'} className="p-0" onClick={handleClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Box>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(submit)}
            >
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Active?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex items-center justify-between"
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(value)}
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
              <FormField
                control={form.control}
                name="sorting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort No.</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        type="number"
                        placeholder="Enter sorting no."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Flex direction={'column'} align={'start'} justify={'center'}>
                <Text className="text-sm font-semibold">Chinese </Text>
                <Flex className="gap-x-2 items-center w-full">
                  <FormField
                    control={form.control}
                    name="icon_zh"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            type="file"
                            placeholder="Enter Operator Name"
                            className="hidden"
                            accept=".svg,.png,.jpg,.jpeg"
                            id="icon_zh"
                            onChange={async (e) => {
                              const url = await handleImageUpload(e);
                              field.onChange(url);
                            }}
                          />
                        </FormControl>

                        {/* this item will show uploaded image */}
                        <Box>
                          {field?.value ? (
                            <Flex className="relative w-20 h-20 group">
                              <img
                                src={field?.value}
                                width={80}
                                height={80}
                                alt="uploaded image"
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <Flex
                                align={'center'}
                                justify={'center'}
                                className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 text-white w-4 h-4 rounded-full bg-black/55 cursor-pointer"
                                onClick={() => form.setValue('icon_zh', '')}
                              >
                                <Icons.Close />
                              </Flex>
                            </Flex>
                          ) : (
                            <label
                              htmlFor="icon_zh"
                              className=" border border-dashed flex justify-center items-center  rounded-lg cursor-pointer w-20 h-20"
                            >
                              <Icons.ImgUpload className=" w-6 h-6" />
                            </label>
                          )}
                        </Box>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="game_name_zh"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs font-normal">
                          Enter Game Name in Chinese{' '}
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            {...field}
                            placeholder="Enter Game Name"
                            id="chImg"
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex direction={'column'} align={'start'} justify={'center'}>
                <Text className="text-sm font-semibold">English </Text>
                <Flex className="gap-x-2 items-center w-full">
                  <FormField
                    control={form.control}
                    name="icon_en"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            type="file"
                            accept=".svg,.png,.jpg,.jpeg"
                            placeholder="Enter Operator Name"
                            className="hidden"
                            id="icon_en"
                            onChange={async (e) => {
                              const url = await handleImageUpload(e);
                              field.onChange(url);
                            }}
                          />
                        </FormControl>

                        {/* this item will show uploaded image */}
                        <Box>
                          {field?.value ? (
                            <Flex className="relative w-20 h-20 group">
                              <img
                                src={field?.value}
                                width={80}
                                height={80}
                                alt="uploaded image"
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <Flex
                                align={'center'}
                                justify={'center'}
                                className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 text-white w-4 h-4 rounded-full bg-black/55 cursor-pointer"
                                onClick={() => form.setValue('icon_en', '')}
                              >
                                <Icons.Close />
                              </Flex>
                            </Flex>
                          ) : (
                            <label
                              htmlFor="icon_en"
                              className=" border border-dashed flex justify-center items-center  rounded-lg cursor-pointer w-20 h-20"
                            >
                              <Icons.ImgUpload className=" w-6 h-6" />
                            </label>
                          )}
                        </Box>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="game_name_en"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs font-normal">
                          Enter Game Name in English{' '}
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            {...field}
                            placeholder="Enter Game Name"
                            id="engImg"
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <Flex direction={'column'} align={'start'} justify={'center'}>
                <Text className="text-sm font-semibold">Myanmar </Text>
                <Flex className="gap-x-2 items-center w-full">
                  <FormField
                    control={form.control}
                    name="icon_mm"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            type="file"
                            accept=".svg,.png,.jpg,.jpeg"
                            placeholder="Enter Operator Name"
                            className="hidden"
                            id="icon_mm"
                            onChange={async (e) => {
                              const url = await handleImageUpload(e);
                              field.onChange(url);
                            }}
                          />
                        </FormControl>

                        {/* this item will show uploaded image */}
                        <Box>
                          {field?.value ? (
                            <Flex className="relative w-20 h-20 group">
                              <img
                                src={field?.value}
                                width={80}
                                height={80}
                                alt="uploaded image"
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <Flex
                                align={'center'}
                                justify={'center'}
                                className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 text-white w-4 h-4 rounded-full bg-black/55 cursor-pointer"
                                onClick={() => form.setValue('icon_mm', '')}
                              >
                                <Icons.Close />
                              </Flex>
                            </Flex>
                          ) : (
                            <label
                              htmlFor="icon_mm"
                              className=" border border-dashed flex justify-center items-center  rounded-lg cursor-pointer w-20 h-20"
                            >
                              <Icons.ImgUpload className=" w-6 h-6" />
                            </label>
                          )}
                        </Box>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="game_name_mm"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs font-normal">
                          Enter Game Name in Myanmar{' '}
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            {...field}
                            placeholder="Enter Game Name"
                            id="mmImg"
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>
              <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full gap-2">
                <Button variant={'outline'} onClick={handleClose}>
                  Cancel
                </Button>

                <Button color="primary" type="submit" autoFocus>
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChildGameEditModal;
