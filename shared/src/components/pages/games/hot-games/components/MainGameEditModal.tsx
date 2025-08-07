import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
}

// Define allowed image MIME types
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/svg+xml', 'image/jpeg'];

const validationSchema = z.object({
  engName: z.string().min(1, { message: 'Name is required!' }),
  engImg: z
    .instanceof(File)
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: 'Invalid file type! Only PNG, SVG, and JPG are allowed.',
    }),
});

type GameType = z.infer<typeof validationSchema>;

const MainGameEditModal = ({ open, handleClose }: DialogProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<GameType>({
    resolver: zodResolver(validationSchema),
  });

  const submit = () => {
    console.log('submit');
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle> Language & Icon </DialogTitle>
        <Box>
          <Form {...form}>
            <form
              className="flex flex-col gap-3 pt-6"
              onSubmit={form.handleSubmit(submit)}
            >
              <Flex direction={'column'} align={'start'} justify={'center'}>
                <Text> English </Text>
                <Flex className="gap-x-2 items-center">
                  <FormField
                    control={form.control}
                    name="engImg"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            type="file"
                            placeholder="Enter Operator Name"
                            className="hidden"
                            id="engImg"
                            onChange={(e) => {
                              handleImageUpload(e);
                              field.onChange(e.target.files?.[0] || null);
                            }}
                          />
                        </FormControl>

                        {/* this item will show uploaded image */}
                        <Box>
                          {uploadedImage ? (
                            <img
                              src={uploadedImage}
                              width={80}
                              height={80}
                              alt="uploaded image"
                              className="w-20 h-20"
                            />
                          ) : (
                            <label
                              htmlFor="engImg"
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
                    name="engName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Enter Game Name in English </FormLabel>
                        <FormControl className="w-full ">
                          <Input
                            {...field}
                            placeholder="Enter Game Name"
                            id="engImg"
                            className="w-[370px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Flex>
              </Flex>

              <Flex justify={'end'} align={'center'} className="gap-x-4">
                <Button variant={'outline'} onClick={handleClose}>
                  Cancel
                </Button>

                <Button color="primary" type="submit">
                  Confirm
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
