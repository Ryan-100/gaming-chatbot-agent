'use client';

import { ChangeEvent, useRef } from 'react';

import { Box, Flex, Text } from '@radix-ui/themes';
import { toast } from 'sonner';
import { Image } from '../ui/image';
import { useCreateFileMutation } from '../../stores/reducers/file-upload.reducer';
import Loading from '../ui/loading';
import { Icons } from '../ui/icons';
import { cn } from '../../utils/cn';

interface ImageSelectProps {
  editMode?: boolean;
  image: string | undefined;
  onClick: any;
  hideControl?: boolean;
  hideDownUpControl?: boolean;
  deleteHandler?: any;
  upHandler?: any;
  downHandler?: any;
  disableUp?: boolean;
  disableDown?: boolean;
}

const ImagePicker: React.FC<ImageSelectProps> = ({
  editMode,
  image,
  onClick,
  hideControl = true,
  hideDownUpControl = false,
  deleteHandler,
  upHandler,
  downHandler,
  disableUp = true,
  disableDown = true,
}) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const [createImage, { isLoading: fileUploading }] = useCreateFileMutation();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      uploadFile({ files: files[0] });
    }
  };

  const uploadFile = async (props: { files: File }) => {
    try {
      const response = await createImage({ file: props.files });
      if (response?.data?.meta?.success) {
        toast.success(`Successfully 'uploaded' image`);
        const result = {
          id: response.data?.body?.data?.id ?? '',
          url: response.data?.body?.data?.url ?? '',
        };
        onClick(result);
      } else {
        toast.error(`Error: ${response.data?.meta?.message}`);
      }
    } catch (error: unknown) {
      console.error(`Error: ${error}`);
    }
  };

  const deleteImage = () => {
    deleteHandler({
      id: '',
      url: '',
    });
  };

  return (
    <Box>
      <Box className="rounded">
        <div
          onClick={() => {
            if (editMode) {
              if (imageRef.current) {
                imageRef.current.click();
              }
            }
          }}
          className="cursor-pointer border border-dashed border-text-link rounded-lg bg-surface-secondary h-[180px]"
        >
          {fileUploading ? (
            <Loading />
          ) : image ? (
            <Image
              width={420}
              height={420}
              className="w-full h-[180px]"
              src={image}
              alt="file input icon"
            />
          ) : (
            <Flex
              direction="column"
              justify="center"
              align="center"
              className="h-[180px]"
            >
              <Image
                width={420}
                height={420}
                className="w-[42px] h-[42px]"
                src="/upload/images/image-input.png"
                alt="file input icon"
              />
              <Text className="text-xs pt-1">
                {!editMode && !image ? 'No Image' : 'Upload Image'}
              </Text>
            </Flex>
          )}
        </div>
        <input
          ref={imageRef}
          type={'file'}
          multiple={false}
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          onChange={handleChangeFile}
        />
      </Box>
      {editMode && !hideControl && (
        <Flex className="space-x-2 pt-4" justify="center">
          <Flex
            justify="center"
            align="center"
            className="w-8 h-8 rounded bg-surface-secondary cursor-pointer"
            onClick={() => {
              if (imageRef.current) {
                imageRef.current.click();
              }
            }}
          >
            <Icons.Replace className="w-5 h-5" />
          </Flex>
          <Flex
            justify="center"
            align="center"
            className="w-8 h-8 rounded bg-surface-secondary cursor-pointer"
            onClick={deleteImage}
          >
            <Icons.Trash className="w-4 h-4 text-primary" />
          </Flex>
          {!hideDownUpControl && (
            <Flex
              justify="center"
              align="center"
              className="w-8 h-8 rounded bg-surface-secondary cursor-pointer"
              onClick={() => {
                if (!disableUp) {
                  upHandler();
                }
              }}
            >
              <Icons.ArrowUp
                className={cn(
                  disableUp ? 'text-gray-400' : 'text-black',
                  'w-4 h-4'
                )}
              />
            </Flex>
          )}
          {!hideDownUpControl && (
            <Flex
              justify="center"
              align="center"
              className="w-8 h-8 rounded bg-surface-secondary cursor-pointer"
              onClick={() => {
                if (!disableDown) {
                  downHandler();
                }
              }}
            >
              <Icons.ArrowDown
                className={cn(
                  disableDown ? 'text-gray-400' : 'text-black',
                  'w-4 h-4'
                )}
              />
            </Flex>
          )}
        </Flex>
      )}
    </Box>
  );
};
export default ImagePicker;
