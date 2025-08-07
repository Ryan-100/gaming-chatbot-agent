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
import { useCreateFileMutation } from '../../../../../../../stores/reducers/file-upload.reducer';
import { createSettingSocialMediaSchema } from '../../../../../../../types/settings-social-media.types';
import { useCreateSettingSocialMediaMutation } from '../../../../../../../stores/reducers/settings-social-media.reducer';

type CreateSocialForm = z.infer<typeof createSettingSocialMediaSchema>;

interface CreateSocialFormDialogProps {
  open: boolean;
  onClose: (result: boolean, data?: CreateSocialForm) => void;
}

export const CreateSocialFormDialog: React.FC<CreateSocialFormDialogProps> = ({
  open,
  onClose,
}) => {
  const form = useForm<CreateSocialForm>({
    resolver: zodResolver(createSettingSocialMediaSchema),
  });

  const [img, setImg] = React.useState<string | File>(''); //img file to upload
  const [imgUrl, setImgUrl] = React.useState(''); //to show ui
  const [createImage, { isLoading: fileUploading }] = useCreateFileMutation();
  const [createSocialLink, { isLoading: formSubmitting }] =
    useCreateSettingSocialMediaMutation();

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
    } catch (error) {
      toast(`Error: ${error}`);
      return;
    }

    return imgIdToSend;
  };

  const submit = async (submittedData: CreateSocialForm) => {
    if (!img) {
      toast.error('Error: Please Upload Image');
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
      appLogoId: imgIdToSend,
      isPublish: submittedData.isPublish === 'true',
    };
    try {
      const response = await createSocialLink(dataToSend);
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
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle>Add New Social Link</DialogTitle>
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
