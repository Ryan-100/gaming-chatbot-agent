import React, { useState } from 'react';
import {
  UpdatePaymentManagementForm,
  updatePaymentManagementSchema,
  PaymentManagementListData,
} from '../../../../../types/payment-management.types';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Label } from '../../../../ui/label';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Image } from '../../../../ui/image';
import { Icons } from '../../../../ui/icons';
import { Input } from '../../../../ui/input';
import { useGetCryptoNetworkQuery } from '../../../../../stores/reducers/crypto-network.reducer';
import { useGetPlayerLevelsQuery } from '../../../../../stores/reducers/player-level.reducer';
import { Button } from '../../../../ui/button';
import {
  useCreateFileMutation,
  useUpdateFileMutation,
} from '../../../../../stores/reducers/file-upload.reducer';
import { useUpdatePaymentManagementAccountMutation } from '../../../../../stores/reducers/payment-management.reducer';

interface UpdatePaymentManagementFormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  yesLabel?: string;
  data: PaymentManagementListData;
  useNetwork: boolean;
}

const UpdatePaymentManagementFormDialog: React.FC<
  UpdatePaymentManagementFormDialogProps
> = ({ data, open, title, onClose, yesLabel = 'Create', useNetwork }) => {
  const isCrypto = data?.PaymentCategory?.PaymentType?.isCrypto;
  const parsedData = updatePaymentManagementSchema.parse(data);

  //i wrote this functio since some optional field may null
  function sanitizeData(obj: any) {
    const data = obj;
    Object.keys(data).forEach((key) => {
      // Check if the value is null
      if (data[key] === null) {
        // Remove the key-value pair from the object
        delete data[key];
      } else if (obj[key] === true) {
        // Change the value to "true" if it's a boolean true
        data[key] = 'true';
      } else if (obj[key] === false) {
        // Change the value to "false" if it's a boolean false
        data[key] = 'false';
      }
    });

    return data;
  }

  const form = useForm<UpdatePaymentManagementForm>({
    resolver: zodResolver(updatePaymentManagementSchema),
    defaultValues: data && sanitizeData(parsedData),
  });

  const { data: playerLevelData } = useGetPlayerLevelsQuery();
  const { data: networkList } = useGetCryptoNetworkQuery();
  const [updateImage] = useUpdateFileMutation();
  const [createImage] = useCreateFileMutation();
  const [updatePaymentManagementAccount] =
    useUpdatePaymentManagementAccountMutation();

  const [needMemo, setNeedMemo] = useState<boolean | undefined>(
    () =>
      networkList?.body?.data?.filter(
        (option) => option.id === data.cryptoNetworkId
      )[0]?.requireMemo
  );
  const [imgUrl, setImgUrl] = useState(data?.Image?.url); //to show ui
  const [img, setImg] = useState<string | File>(''); //img file to upload
  const [isImgChanged, setIsImgChanged] = useState(false); //to track if should we called upload api or not

  const getImageId = async () => {
    let imgIdToSend;

    if (!isImgChanged && data?.imageId) {
      return (imgIdToSend = data?.imageId);
    }
    if (data?.imageId) {
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
    } else {
      const response = await createImage({
        file: img,
      });
      if (response?.data?.meta?.success) {
        toast(`Successfully updated image`);
        imgIdToSend = response?.data?.body?.data?.id;
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    }

    return imgIdToSend;
  };

  const submit = async (submittedData: UpdatePaymentManagementForm) => {
    const imgIdToSend = await getImageId();

    const dataToSend = {
      ...submittedData,
      imageId: imgIdToSend,
      isPublish: submittedData.isPublish === 'true',
      ssRequired: submittedData.ssRequired === 'true',
      showQR: submittedData.showQR === 'true',
    };

    try {
      const response = await updatePaymentManagementAccount({
        id: data?.id,
        data: dataToSend,
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

            {useNetwork && (
              <FormField
                control={form.control}
                name="cryptoNetworkId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Network</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ''}
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
                      <Input
                        value={field.value || ''}
                        onChange={field.onChange}
                        placeholder="Enter MEMO"
                      />
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
                        <SelectValue placeholder="Select" />
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
                      placeholder="Enter account limit"
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

            <FormField
              control={form.control}
              name="ssRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Screenshot Require?</FormLabel>
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
                      {!isCrypto && (
                        <Box className={'w-1/2 flex items-center space-x-2'}>
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
                      className="rounded-[12px] object-cover"
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

export default UpdatePaymentManagementFormDialog;
