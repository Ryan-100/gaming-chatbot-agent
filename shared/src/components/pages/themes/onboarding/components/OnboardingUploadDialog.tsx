'use client';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Box, Flex, Text } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Label } from '../../../../ui/label';
import { Input } from '../../../../ui/input';
import { Textarea } from '../../../../ui/textarea';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
} from '../../../../ui/form';
import { Image } from '../../../../ui/image';
import { Icons } from '../../../../ui/icons';
import { useCreateFileMutation } from '../../../../../stores/reducers/file-upload.reducer';

interface OnboardingUploadDialogProps {
  open: boolean;
  onClose: (result: boolean) => void;
  setImage: (
    id: string,
    url: string,
    headline: string,
    description: string
  ) => void;
}

const validationSchema = z.object({
  headline: z.string(),
  description: z.string(),
});

type OnboardingForm = z.infer<typeof validationSchema>;

export const OnboardingUploadDialog: React.FC<OnboardingUploadDialogProps> = ({
  open,
  onClose,
  setImage,
}) => {
  const form = useForm<OnboardingForm>({
    resolver: zodResolver(validationSchema),
  });

  const [img, setImg] = React.useState<string | File>(''); //img file to upload
  const [imgUrl, setImgUrl] = React.useState(''); //to show ui
  const [createImage, { isLoading: fileUploading }] = useCreateFileMutation();

  const getImage = async () => {
    let imageData;
    try {
      const response = await createImage({ file: img });

      imageData = response?.data?.body?.data;

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

    return imageData;
  };

  const closeHandler = () => {
    setImg('');
    setImgUrl('');
    form.reset({
      headline: '',
      description: '',
    });
    onClose(false);
  };

  const submit = async (data: OnboardingForm) => {
    if (!img) {
      toast.error('Error: Please Upload Image');
      return;
    }

    try {
      const image = await getImage();
      setImage(
        image?.id ?? '',
        image?.url ?? '',
        data.headline,
        data.description
      );
    } catch (error) {
      return;
    }

    closeHandler();
  };

  const updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileData = event.target.files[0];
      if (fileData.size > 100 * 1024 * 1024) {
        toast.error('File size exceeds the limit of 100 MB.');
        return;
      }
      try {
        const url = URL.createObjectURL(fileData);
        setImgUrl(url);
        setImg(fileData);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  };

  const deleteImage = () => {
    setImg('');
    setImgUrl('');
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Add Onboarding</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <FormItem>
              {imgUrl ? (
                <div className="relative flex w-full justify-center items-center">
                  <Box className="relative w-[200px] h-[200px]">
                    <Flex
                      align="center"
                      className="absolute top-2 right-2 gap-1"
                    >
                      <Label
                        htmlFor="image"
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-primary cursor-pointer"
                      >
                        <input
                          hidden
                          id="image"
                          type="file"
                          accept=".jpeg,.jpg"
                          onChange={updateFile}
                        />
                        <Icons.Refresh className="w-4 h-4 text-text-invert" />
                      </Label>
                      <Flex
                        align={'center'}
                        justify={'center'}
                        className="w-6 h-6 rounded-full bg-primary cursor-pointer"
                        onClick={deleteImage}
                      >
                        <Icons.Trash2 className="w-4 h-4 text-text-invert" />
                      </Flex>
                    </Flex>
                    <Box className="w-[200px] h-[200px] overflow-hidden">
                      <Image
                        src={imgUrl}
                        width={200}
                        height={200}
                        alt="App Icon"
                        className="object-fill w-[200px] h-[200px]"
                      />
                    </Box>
                  </Box>
                </div>
              ) : (
                <Label
                  htmlFor="image"
                  className="w-full h-[200px] bg-surface-secondary rounded-lg border border-dashed border-border-link flex flex-col items-center justify-center cursor-pointer"
                >
                  <input
                    hidden
                    id="image"
                    type="file"
                    accept=".jpg, .jpeg,"
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
            </FormItem>
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=""
                      placeholder="Enter headline for onboarding"
                      maxLength={100}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none"
                      rows={3}
                      placeholder="Enter description for onboarding"
                      maxLength={200}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="link"
                onClick={() => closeHandler()}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" autoFocus loading={fileUploading}>
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
