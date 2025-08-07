'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Box } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../../ui/dialog';
import { Button } from '../../../../../../ui/button';
import { RadioGroup, RadioGroupItem } from '../../../../../../ui/radio-group';
import { Label } from '../../../../../../ui/label';
import { Input } from '../../../../../../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../../ui/form';
import { Image } from '../../../../../../ui/image';
import { Icons } from '../../../../../../ui/icons';
import { SettingSocialMediaListData } from '../../../../../../../types/settings-social-media.types';
import { useUpdateFileMutation } from '../../../../../../../stores/reducers/file-upload.reducer';
import { updateSettingSocialMediaSchema } from '../../../../../../../types/settings-social-media.types';
import { useUpdateSettingSocialMediaMutation } from '../../../../../../../stores/reducers/settings-social-media.reducer';

type EditSocialForm = z.infer<typeof updateSettingSocialMediaSchema>;

interface EditSocialFormDialogProps {
  data: SettingSocialMediaListData;
  open: boolean;
  onClose: (result: boolean, data?: EditSocialForm) => void;
}

export const EditSocialFormDialog: React.FC<EditSocialFormDialogProps> = ({
  data,
  open,
  onClose,
}) => {
  const form = useForm<EditSocialForm>({
    resolver: zodResolver(updateSettingSocialMediaSchema),
    defaultValues: {
      isPublish: String(data?.isPublish),
      appLogoId: data?.appLogoId,
      link: data?.link,
      name: data?.name,
    },
  });

  const [imgUrl, setImgUrl] = React.useState(''); //to show ui
  const [img, setImg] = React.useState<string | File>(''); //img file to upload
  const [isImgChanged, setIsImgChanged] = React.useState(false); //to track if should we called upload api or not

  const [updateImage, { isLoading: fileUploading }] = useUpdateFileMutation();
  const [updateSocialLink, { isLoading: formSubmitting }] =
    useUpdateSettingSocialMediaMutation();

  React.useEffect(() => {
    if (data) {
      setImgUrl(data?.AppLogo?.url);
    }
    //eslint-disable-next-line
  }, []);

  const getImageId = async () => {
    let imgIdToSend;

    if (!isImgChanged) {
      return (imgIdToSend = data?.appLogoId);
    }

    const response = await updateImage({
      id: data?.appLogoId || '',
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

  const submit = async (submittedData: EditSocialForm) => {
    const imgIdToSend = await getImageId();

    const dataToSend = {
      ...submittedData,
      appLogoId: imgIdToSend,
      isPublish: submittedData.isPublish === 'true',
    };
    try {
      const response = await updateSocialLink({
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
    form.reset({
      isPublish: 'true',
      appLogoId: '',
      link: '',
      name: '',
    });
    setImg('');
    setImgUrl('');
    onClose(true);
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
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle>Edit Social Link</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <FormItem>
              <FormLabel>Upload Social App</FormLabel>
              {imgUrl ? (
                <Label
                  htmlFor="appLogo"
                  className="border border-dashed flex justify-center items-center rounded-lg cursor-pointer w-20 h-20"
                >
                  <input
                    hidden
                    id="appLogo"
                    type="file"
                    accept=".png,.jpg,.svg"
                    onChange={updateFile}
                  />
                  <Image
                    src={imgUrl}
                    width={80}
                    height={80}
                    alt="App Icon"
                    className="w-20 h-20 border border-dashed rounded-lg"
                  />
                </Label>
              ) : (
                <FormControl>
                  <Label
                    htmlFor="appLogo"
                    className="border border-dashed flex justify-center items-center rounded-lg cursor-pointer w-20 h-20"
                  >
                    <input
                      hidden
                      id="appLogo"
                      type="file"
                      accept=".png,.jpg,.svg"
                      onChange={updateFile}
                    />
                    <Icons.ImgUpload className="w-8 h-8" />
                  </Label>
                </FormControl>
              )}
            </FormItem>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter display name for social app"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social app link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter social app link" />
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
                      onValueChange={field.onChange}
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
            <DialogFooter>
              <Button
                type="button"
                variant="link"
                loading={fileUploading || formSubmitting}
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
