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

type ImageProps = {
  id: string;
  url: string;
  order: number;
  redirectUrl: string;
};
interface AdsUpdateDialogProps {
  imageToReplace: ImageProps;
  open: boolean;
  onClose: (result: boolean) => void;
  setImage: (
    id: string,
    url: string,
    order: number,
    redirectUrl: string
  ) => void;
}

const validationSchema = z.object({
  redirectUrl: z.string(),
});

type AdsForm = z.infer<typeof validationSchema>;

export const AdsUpdateDialog: React.FC<AdsUpdateDialogProps> = ({
  imageToReplace,
  open,
  onClose,
  setImage,
}) => {
  const form = useForm<AdsForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      redirectUrl: imageToReplace.redirectUrl,
    },
  });

  const [img, setImg] = React.useState<string | File>(''); //img file to upload
  const [imgUrl, setImgUrl] = React.useState(imageToReplace.url); //to show ui
  const [createImage, { isLoading: fileUploading }] = useCreateFileMutation();

  const getImage = async () => {
    let imageData;
    try {
      const response = await createImage({ file: img });

      imageData = response?.data?.body?.data;

      if (response?.data?.meta?.success) {
        toast(`Successfully 'uploaded' image`);
      } else {
        const errorResponse:any = response;
toast.error(errorResponse?.error.data?.meta?.message);;
      }
    } catch (error) {
      toast(`Error: ${error}`);
      return;
    }

    return imageData;
  };

  const submit = async (data: AdsForm) => {
    if (!img && !imgUrl) {
      toast.error('Error: Please Upload Image');
      return;
    }
    if (!img && imgUrl) {
      setImage(
        imageToReplace.id,
        imageToReplace.url,
        imageToReplace.order,
        data.redirectUrl
      );
    } else {
      try {
        const image = await getImage();
        setImage(
          image?.id ?? '',
          image?.url ?? '',
          imageToReplace.order,
          data.redirectUrl
        );
      } catch (error) {
        return;
      }
    }
    setImg('');
    setImgUrl('');
    form.reset({
      redirectUrl:''
    })
    onClose(false);
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
        <DialogTitle>Edit Ad</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <FormItem>
              {imgUrl ? (
                <Box className="relative transform translate-x-1/3">
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
                        className="object-cover"
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Label
                  htmlFor="image"
                  className="w-full h-[200px] bg-surface-secondary rounded-lg border border-dashed border-border-link flex flex-col items-center justify-center cursor-pointer"
                >
                  <input
                    hidden
                    id="image"
                    type="file"
                    accept=".jpeg,.jpg"
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
              name="redirectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=""
                      placeholder="Paste link here"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="link"
                onClick={() => onClose(false)}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" autoFocus loading={fileUploading}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
