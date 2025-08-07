'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Label } from '../../../../ui/label';
import { Input } from '../../../../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Icons } from '../../../../ui/icons';
import { InputAdornment } from '../../../../ui/input-adornment';
import {
  createPlayerLevelSchema,
  CreatePlayerLevelForm,
  PlayerLevelListData,
} from '../../../../../types/player-level.types';
import {
  useCreatePlayerLevelMutation,
  useUpdatePlayerLevelMutation,
} from '../../../../../stores/reducers/player-level.reducer';
import { toast } from 'sonner';
import {
  useCreateFileMutation,
  useUpdateFileMutation,
} from '../../../../../stores/reducers/file-upload.reducer';
import { useGetExchangeCurrencyQuery } from '../../../../../stores/reducers/exchange-rate.reducer';

const TextEditor = dynamic(() => import('../../../../ui/text-editor'), {
  ssr: false,
});

interface LevelsFormDialogProps {
  data?: PlayerLevelListData;
  open: boolean;
  title: string;
  onClose: () => void;
  yesLabel?: string;
  noLabel?: string;
}

export const LevelsFormDialog: React.FC<LevelsFormDialogProps> = ({
  data,
  open,
  title,
  onClose,
  yesLabel = 'Create',
  noLabel = 'No',
}) => {
  const form = useForm<CreatePlayerLevelForm>({
    resolver: zodResolver(createPlayerLevelSchema),
    defaultValues: data && createPlayerLevelSchema.parse(data),
  });

  const { data: ExchangeCurrency, isLoading } = useGetExchangeCurrencyQuery();

  const [updatePlayerLevel, { isLoading: isUpdating }] =
    useUpdatePlayerLevelMutation();
  const [createPlayerLevel, { isLoading: isCreating }] =
    useCreatePlayerLevelMutation();

  const [createImage, { isLoading: creatingImage }] = useCreateFileMutation();
  const [updateImage, { isLoading: updatingImage }] = useUpdateFileMutation();

  const isUpdateForm = data;

  const [img, setImg] = useState<string | File>(''); //img file to upload
  const [imgUrl, setImgUrl] = useState(''); //to show ui
  const [isImgChanged, setIsImgChanged] = useState(false); //to track if should we called upload api or not

  //if edit form there will be data object so set imgUrl to show img and image id to give in repsonse
  useEffect(() => {
    if (data) {
      setImgUrl(data.Image.url);
    }

    //eslint-disable-next-line
  }, []);

  const getImageId = async () => {
    let imgIdToSend = data?.imageId;

    if (isUpdateForm && !isImgChanged) {
      imgIdToSend = data.imageId;
    }

    if (isImgChanged) {
      try {
        let response;

        if (isUpdateForm) {
          // Case: Update form and image has changed
          response = await updateImage({
            id: data.imageId,
            data: { file: img },
          });
        } else {
          // Case: Create form and image has changed
          response = await createImage({ file: img });
        }

        imgIdToSend = response?.data?.body?.data?.id;

        if (response?.data?.meta?.success) {
          toast(`Successfully ${isUpdateForm ? 'updated' : 'uploaded'} image`);
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error: any) {
        console.error(error);
        toast(`Error: ${error?.message}`);
        return;
      }
    }

    return imgIdToSend;
  };

  const submit = async (submittedData: CreatePlayerLevelForm) => {
    if (!isUpdateForm && !isImgChanged) {
      toast('Error: Please Upload Image');
      return;
    }

    const imgIdToSend = await getImageId();

    const dataToSend = {
      ...submittedData,
      imageId: imgIdToSend,
    };

    if (data) {
      try {
        const response = await updatePlayerLevel({
          id: data?.id,
          data: dataToSend,
        });
        if (response.data?.meta?.success) {
          toast('Successfully updated player level');
          form.reset();
          onClose();
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await createPlayerLevel(dataToSend);
        console.log(response, 'response');
        if (response.data?.meta?.success) {
          toast('Successfully created player level');
          form.reset();
          onClose();
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileData = event.target.files[0];
      try {
        const url = URL.createObjectURL(fileData);
        setImgUrl(url);
        setImg(fileData);
        setIsImgChanged(true);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px] py-0">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle> {title} </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
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
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value))
                      }
                      type="number"
                      placeholder="Enter order"
                    />
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
                    <Input {...field} placeholder="Enter level name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Rank </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter rank" />
                  </FormControl>
                </FormItem>
              )}
            />
            {isLoading ? null : (
              <FormField
                control={form.control}
                name="minDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min. Deposit</FormLabel>
                    <FormControl>
                      <InputAdornment
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        type="number"
                        endAdornment={ExchangeCurrency?.body?.data?.key}
                        placeholder="Enter min deposit amount"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {imgUrl ? (
              <div className={`relative`}>
                <img
                  src={imgUrl}
                  width={80}
                  height={80}
                  alt="App Icon"
                  className="w-20 h-20 border border-dashed rounded-lg"
                />
                <Label
                  htmlFor="image"
                  className=" absolute top-[4px] left-[52px] rounded-lg cursor-pointer w-6 h-6 bg-gray-200"
                >
                  <input
                    hidden
                    id="image"
                    type="file"
                    accept=".svg"
                    onChange={updateFile}
                  />
                  <Icons.Replay className="w-6 h-6 text-text-invert fill-black" />
                </Label>
              </div>
            ) : (
              <Label
                htmlFor="image"
                className="border border-dashed flex justify-center items-center rounded-lg cursor-pointer w-20 h-20"
              >
                <input
                  hidden
                  id="image"
                  type="file"
                  accept=".svg"
                  onChange={updateFile}
                />
                <Icons.ImgUpload className="w-8 h-8" />
              </Label>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Description</FormLabel>
                  <FormControl>
                    <TextEditor
                      defaultValue={field.value}
                      setValue={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
                className="text-gray-700 font-semibold mr-4"
              >
                {noLabel}
              </Button>
              <Button
                type="submit"
                disabled={!form?.formState?.isValid}
                loading={
                  updatingImage || isUpdating || creatingImage || isCreating
                }
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

//need currency
