import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Input } from '../../../../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { useGetPaymentCategoryQuery } from '../../../../../stores/reducers/payment-category.reducer';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreatePaymentManagementForm,
  createPaymentManagementSchema,
} from '../../../../../types/payment-management.types';
import { useGetCryptoNetworkQuery } from '../../../../../stores/reducers/crypto-network.reducer';
import { useGetPlayerLevelsQuery } from '../../../../../stores/reducers/player-level.reducer';
import { useCreateFileMutation } from '../../../../../stores/reducers/file-upload.reducer';
import { useCreatePaymentManagementAccountMutation } from '../../../../../stores/reducers/payment-management.reducer';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Label } from '../../../../ui/label';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Image } from '../../../../ui/image';
import { Icons } from '../../../../ui/icons';
import { cn } from '../../../../../utils/cn';

interface CreatePaymentManagementFormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  yesLabel?: string;
}

const CreatePaymentManagementFormDialog: React.FC<
  CreatePaymentManagementFormDialogProps
> = ({ open, title, onClose, yesLabel = 'Create' }) => {
  const form = useForm<CreatePaymentManagementForm>({
    resolver: zodResolver(createPaymentManagementSchema),
  });

  const query = {
    pageIndex: 1,
    rowPerPage: 100,
    word: '',
  };

  const [isCrypto, setIsCrypto] = useState(false);
  const [useNetwork, setUseNetwork] = useState<boolean | undefined>(false);
  const [needMemo, setNeedMemo] = useState<boolean | undefined>(false);

  const [img, setImg] = useState<string | File>(''); //img file to upload
  const [imgUrl, setImgUrl] = useState(''); //to show ui

  const { data: networkList } = useGetCryptoNetworkQuery();
  const { data: paymentCategoryList } = useGetPaymentCategoryQuery(query);
  const { data: playerLevelData } = useGetPlayerLevelsQuery();
  const [createImage] = useCreateFileMutation();
  const [createPaymentManagementAccount] =
    useCreatePaymentManagementAccountMutation();

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

  const submit = async (submittedData: CreatePaymentManagementForm) => {
    if (!img) {
      toast.error('Error: Please Upload Image');
      return;
    }

    if (useNetwork && !submittedData?.cryptoNetworkId) {
      form.setError('cryptoNetworkId', {
        type: 'manual',
        message: 'Select Crypto Network',
      });
      return;
    }

    if (needMemo && !submittedData?.memo) {
      form.setError('memo', {
        type: 'manual',
        message: 'Enter memo',
      });
      toast.error('Enter memo');
      return;
    }

    let imgIdToSend;

    try {
      imgIdToSend = await getImageId();
      if (!imgIdToSend) {
        return;
      }
    } catch (error) {
      return;
    }

    const dataToSend = {
      ...submittedData,
      imageId: imgIdToSend,
      isPublish: submittedData.isPublish === 'true',
      ssRequired: submittedData.ssRequired === 'true',
      showQR: submittedData.showQR === 'true',
    };

    try {
      const response = await createPaymentManagementAccount(dataToSend);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        form.reset();
        setImgUrl('');
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
      <DialogContent className="py-0">
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
              name="paymentCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setUseNetwork(
                          () =>
                            paymentCategoryList?.body?.data.filter(
                              (item) => item.id === value
                            )[0].PaymentType?.useNetwork
                        );
                        setIsCrypto(
                          () =>
                            paymentCategoryList?.body?.data.filter(
                              (item) => item.id === value
                            )[0].PaymentType?.isCrypto || false
                        );
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {paymentCategoryList?.body?.data &&
                            paymentCategoryList?.body.data.map(
                              (option, index) => (
                                <SelectItem value={option.id} key={index}>
                                  {option.accountType}
                                </SelectItem>
                              )
                            )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {useNetwork && (
              <FormField
                control={form.control}
                name="cryptoNetworkId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Network</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setNeedMemo(
                            () =>
                              networkList?.body?.data?.filter(
                                (option) => option.id === value
                              )[0].requireMemo
                          );
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {networkList?.body?.data &&
                              networkList.body.data.map((option, index) => (
                                <SelectItem value={option.id} key={index}>
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
            )}

            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Account Name </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Account Name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {' '}
                    {useNetwork ? 'Network Address' : 'Account No.'}{' '}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Enter ${
                        useNetwork ? 'Network Address' : 'Account No.'
                      } `}
                      maxLength={50}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {needMemo && (
              <FormField
                control={form.control}
                name="memo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> MEMO </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter MEMO" />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="playerLevelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player Level</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select player level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {playerLevelData?.body?.data &&
                            playerLevelData.body.data.map((option, index) => (
                              <SelectItem value={option.id} key={index}>
                                {`${option.name}`}
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
              name="accountLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Maximum Limit Amount </FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value))
                      }
                      placeholder="Enter maximum limit amount"
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
              name="ssRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Screenshot Require?</FormLabel>
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

                      {!isCrypto && (
                        <Box
                          className={cn('w-1/2 flex items-center space-x-2')}
                        >
                          <RadioGroupItem value="false" id="No" />
                          <Label className="text-xs" htmlFor="No">
                            No
                          </Label>
                        </Box>
                      )}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showQR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Show QR?</FormLabel>
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

            <FormLabel>QR Code</FormLabel>
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
                      alt="App Icon"
                      className="object-cover"
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
                  setImgUrl('');
                  onClose();
                }}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!form?.formState?.isValid}>
                {yesLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePaymentManagementFormDialog;
