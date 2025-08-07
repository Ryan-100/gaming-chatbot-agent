import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Label } from '../../../../ui/label';
import { Input } from '../../../../ui/input';
import { Image } from '../../../../ui/image';
import { Icons } from '../../../../ui/icons';
import { Box, Flex, Text } from '@radix-ui/themes';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import {
  PaymentCategoryListData,
  UpdatePaymentCategoryForm,
  updatePaymentCategorySchema,
} from '../../../../../types/payment-category.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../ui/button';
import { useUpdateFileMutation } from '../../../../../stores/reducers/file-upload.reducer';
import { toast } from 'sonner';
import { useUpdatePaymentCategoryMutation } from '../../../../../stores/reducers/payment-category.reducer';

interface UpdatePaymentCategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  isCrypto: boolean;
  data: PaymentCategoryListData;
}

const UpdatePaymentCategoryFormDialog: React.FC<
  UpdatePaymentCategoryFormDialogProps
> = ({ open, onClose, isCrypto, data }) => {
  const form = useForm<UpdatePaymentCategoryForm>({
    resolver: zodResolver(updatePaymentCategorySchema),
    defaultValues: {
      order: data?.order,
      accountType: data?.accountType,
      isPublish: data?.isPublish ? 'true' : 'false',
    },
  });

  React.useEffect(() => {
    if (!isCrypto) {
      form.setValue('transactionDigitCount', data?.transactionDigitCount);
    }
  }, [isCrypto, data]);

  const [imgUrl, setImgUrl] = useState(data?.File?.url); //to show ui
  const [img, setImg] = useState<string | File>(''); //img file to upload
  const [isImgChanged, setIsImgChanged] = useState(false); //to track if should we called upload api or not

  const [updateImage] = useUpdateFileMutation();
  const [updatePaymentCategory] = useUpdatePaymentCategoryMutation();

  const getImageId = async () => {
    let imgIdToSend;

    if (!isImgChanged) {
      return (imgIdToSend = data?.imageId);
    }

    const response = await updateImage({
      id: data?.imageId || '',
      data: { file: img },
    });

    if (response?.data?.meta?.success) {
      toast(`Successfully updated image`);
      imgIdToSend = response?.data?.body?.data?.id;
    } else {
      const errorResponse: any = response;
      toast.error(errorResponse?.error.data?.meta?.message);
    }

    return imgIdToSend;
  };

  const submit = async (submittedData: UpdatePaymentCategoryForm) => {
    const imgIdToSend = await getImageId();

    const dataToSend = {
      ...submittedData,
      imageId: imgIdToSend,
      isPublish: submittedData.isPublish === 'true',
    };

    try {
      const response = await updatePaymentCategory({
        id: data?.id,
        data: dataToSend,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }

    form.reset();
    onClose();
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
      <DialogContent className="py-0 w-[calc(100%-32px)] max-w-[800px]">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle> Update Payment Category </DialogTitle>

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
                  <FormLabel>Sorting No.</FormLabel>
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

            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Name" />
                  </FormControl>
                </FormItem>
              )}
            />

            {!isCrypto && (
              <FormField
                control={form.control}
                name="transactionDigitCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trx Num Digit</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(
                            parseInt(event.target.value.slice(0, 1))
                          )
                        }
                        type="number"
                        placeholder="Enter trx num digit"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="isPublish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Publish?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex items-center justify-between"
                      value={field.value === 'true' ? 'true' : 'false'}
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

            <FormLabel>QR Code</FormLabel>
            <div className="flex w-full justify-center items-center">
              {imgUrl ? (
                <Box className="relative">
                  <Box className="relative w-[200px] h-[200px]">
                    <Flex
                      align="center"
                      className="absolute top-0 right-2 gap-1"
                    >
                      <Label
                        htmlFor="qr_code"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-primary cursor-pointer"
                      >
                        <input
                          hidden
                          id="qr_code"
                          type="file"
                          accept=".png,.jpg"
                          onChange={updateFile}
                        />
                        <Icons.Replay className="w-5 h-5 text-text-invert" />
                      </Label>
                    </Flex>
                    <img
                      src={imgUrl}
                      width={200}
                      height={200}
                      alt="App Icon"
                      className="rounded-[12px]"
                    />
                  </Box>
                </Box>
              ) : (
                <Label
                  htmlFor="qr_code"
                  className="w-full h-[200px] bg-surface-secondary rounded-lg border border-dashed border-border-link flex flex-col items-center justify-center cursor-pointer"
                >
                  <input
                    hidden
                    id="qr_code"
                    type="file"
                    accept=".png,.jpg"
                    onChange={updateFile}
                  />
                  <Image
                    src={'/upload/icons/add-image-icon.svg'}
                    alt="add image"
                    width={42}
                    height={42}
                  />
                  <Text className="text-xs mt-2">Upload QR Code</Text>
                </Label>
              )}
            </div>

            <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
              <Button
                variant="link"
                type="button"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                // disabled={!form?.formState?.isValid}
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

export default UpdatePaymentCategoryFormDialog;
