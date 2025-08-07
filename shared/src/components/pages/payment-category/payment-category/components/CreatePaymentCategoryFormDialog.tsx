import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import {
  CreatePaymentCategoryForm,
  createPaymentCategorySchema,
} from '../../../../../types/payment-category.types';
import { Button } from '../../../../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { useGetPaymentTypesQuery } from '../../../../../stores/reducers/payment-type.reducer';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useCreateFileMutation } from '../../../../../stores/reducers/file-upload.reducer';
import { useCreatePaymentCategoryMutation } from '../../../../../stores/reducers/payment-category.reducer';
import { toast } from 'sonner';

interface CreatePaymentCategoryFormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
}

const CreatePaymentCategoryFormDialog: React.FC<
  CreatePaymentCategoryFormDialogProps
> = ({ open, onClose }) => {
  const form = useForm<CreatePaymentCategoryForm>({
    resolver: zodResolver(createPaymentCategorySchema),
  });

  const [isCrypto, setIsCrypto] = useState(false);
  const [img, setImg] = useState<string | File>(''); //img file to upload
  const [imgUrl, setImgUrl] = useState(''); //to show ui

  const { data: paymentTypeData } = useGetPaymentTypesQuery();
  const [createImage] = useCreateFileMutation();
  const [createPaymentCategory] = useCreatePaymentCategoryMutation();

  const getImageId = async () => {
    let imgIdToSend;
    try {
      const response = await createImage({ file: img });

      imgIdToSend = response?.data?.body?.data?.id;

      if (response?.data?.meta?.success) {
        toast(`Successfully 'uploaded' image`);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast(`Error: ${error?.message}`);
      return;
    }

    return imgIdToSend;
  };

  const submit = async (submittedData: CreatePaymentCategoryForm) => {
    if (!img) {
      toast.error('Error: Please Upload Image');
      return;
    }

    if (!isCrypto && !submittedData?.transactionDigitCount) {
      form.setError('transactionDigitCount', {
        type: 'manual',
        message: 'Enter Digit Count',
      });
      toast.error('Enter Digit Count');
      return;
    }

    let imgIdToSend;

    try {
      imgIdToSend = await getImageId();
    } catch (error) {
      return;
    }

    const dataToSend = {
      ...submittedData,
      imageId: imgIdToSend,
      isPublish: submittedData.isPublish,
    };

    try {
      const response = await createPaymentCategory(dataToSend);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        form.reset();
        onClose();
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileData = event.target.files[0];
      try {
        const url = URL.createObjectURL(fileData);
        setImgUrl(url);
        setImg(fileData);
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
          className="sticky top-0 left-0 bg-background z-20 pt-4 "
        >
          <DialogTitle> Payment Category </DialogTitle>

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
              name="paymentTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setIsCrypto(
                          () =>
                            paymentTypeData?.body?.data.filter(
                              (option) => option.id === value
                            )[0].isCrypto || false
                        );
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {paymentTypeData?.body &&
                            paymentTypeData.body.data.map((option) => (
                              <SelectItem value={option?.id}>
                                {option.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                    <Input
                      {...field}
                      placeholder="Enter payment category name"
                    />
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
                      value={String(field.value)}
                      onValueChange={(value) =>
                        field.onChange(value === 'true')
                      }
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

            <FormLabel>Payment Category Image</FormLabel>
            <div className="flex w-full justify-center items-center">
              {imgUrl ? (
                <Box className="relative">
                  <Box className="relative w-[200px] h-[200px]">
                    <Flex
                      align="center"
                      className="absolute top-2 right-2 gap-1"
                    >
                      <Label
                        htmlFor="qr_code"
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-primary cursor-pointer"
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
                    <Image
                      src={imgUrl}
                      width={200}
                      height={200}
                      className="object-cover"
                      alt="App Icon"
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
                  <Text className="text-xs mt-2">Upload Image</Text>
                </Label>
              )}
            </div>

            <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
              <Button
                variant="link"
                type="button"
                onClick={() => onClose()}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!form?.formState?.isValid}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePaymentCategoryFormDialog;
