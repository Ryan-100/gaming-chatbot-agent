import React from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle } from '../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Box, Flex, Text } from '@radix-ui/themes';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import {
  MainGameDetailData,
  MainGameListData,
} from '../../../../../types/main-games.types';
import { useUpdateMainGameMutation } from '../../../../../stores/reducers/main-games.reducer';
import { LanguageData } from '../../../../../types/language.types';
import { useCreateFileMutation } from '../../../../../stores/reducers/file-upload.reducer';

interface DialogProps {
  data: MainGameDetailData | MainGameListData;
  languageData: LanguageData[];
  open: boolean;
  handleClose: () => void;
}

const validationSchema = z.object({
  mainGameLanguages: z.array(
    z.object({
      id: z.number(),
      name: z.string().min(1, { message: 'Name is required!' }),
      language_id: z.string(),
      icon: z.string().min(1, { message: 'Icon is required!' }),
      language_name: z.string().optional(),
    })
  ),
});

type GameType = z.infer<typeof validationSchema>;

const MainGameEditModal = ({
  data,
  open,
  languageData,
  handleClose,
}: DialogProps) => {
  const defaultData = {
    mainGameLanguages: data?.mainGameLanguages?.map((item, index) => {
      return {
        id: item?.id,
        icon: item?.icon,
        name: item?.name,
        language_id: item?.language_id,
        language_name: languageData?.find(
          (language) => language.id === item?.language_id
        )?.name,
      };
    }),
  };
  const [createImage, { isLoading: fileUploading }] = useCreateFileMutation();
  const [updateMainGame, { isLoading: formSubmitting }] =
    useUpdateMainGameMutation();

  const form = useForm<GameType>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultData,
  });

  const { fields } = useFieldArray({
    name: 'mainGameLanguages',
    control: form.control,
  });

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

  const submit = async (submittedData: any) => {
    const dataToSend = {
      id: data?.id,
      sorting: data?.sorting,
      is_active: data?.is_active,
      has_child: data?.has_child,
      mainGameLanguages: submittedData.mainGameLanguages.map(
        (language: any) => {
          const { language_name, ...rest } = language;
          return rest;
        }
      ),
    };
    try {
      const response = await updateMainGame({ data: dataToSend });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Language & icon</DialogTitle>
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
              {fields.map((item, index) => (
                <Flex
                  direction={'column'}
                  align={'start'}
                  justify={'center'}
                  key={index}
                >
                  <Text className="text-sm md:text-base">
                    {' '}
                    {item.language_name}{' '}
                  </Text>
                  <Flex className="gap-x-2 items-center w-full">
                    <FormField
                      control={form.control}
                      name={`mainGameLanguages.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              type="file"
                              placeholder="Enter Operator Name"
                              className="hidden"
                              accept=".svg,.png,.jpg,.jpeg"
                              id={`icon_${item.language_name}`}
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
                                  onClick={() =>
                                    form.setValue(
                                      `mainGameLanguages.${index}.icon`,
                                      ''
                                    )
                                  }
                                >
                                  <Icons.Close />
                                </Flex>
                              </Flex>
                            ) : (
                              <label
                                htmlFor={`icon_${item.language_name}`}
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
                      name={`mainGameLanguages.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            Enter Game Name in {item.language_name}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter Game Name" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Flex>
                </Flex>
              ))}

              <Flex justify={'end'} align={'center'} className="gap-x-4">
                <Button variant={'outline'} type="button" onClick={handleClose}>
                  Cancel
                </Button>

                <Button color="primary" type="submit" loading={formSubmitting}>
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

export default MainGameEditModal;
