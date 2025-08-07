'use client';

import { ChangeEvent, useRef } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { toast } from 'sonner';
import { useCreateFileMutation } from '../../stores/reducers/file-upload.reducer';
import Loading from '../ui/loading';
import { Icons } from '../ui/icons';
import { cn } from '../../utils/cn';
import { Image } from '../ui/image';

interface VideoSelectProps {
  editMode?: boolean;
  video: string;
  onClick: any;
  hideControl?: boolean;
  hideDownUpControl?: boolean;
  deleteHandler?: any;
  upHandler?: any;
  downHandler?: any;
  disableUp?: boolean;
  disableDown?: boolean;
}

const VideoPicker: React.FC<VideoSelectProps> = ({
  editMode,
  video,
  onClick,
  hideControl = true,
  hideDownUpControl = false,
  deleteHandler,
  upHandler,
  downHandler,
  disableUp = true,
  disableDown = true,
}) => {
  const videoRef = useRef<HTMLInputElement>(null);

  const [createVideo, { isLoading: fileUploading }] = useCreateFileMutation();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      uploadFile({ files: files[0] });
    }
  };

  const uploadFile = async (props: { files: File }) => {
    try {
      const response = await createVideo({ file: props.files });
      if (response?.data?.meta?.success) {
        toast.success(`Successfully 'uploaded' video`);
        const result = {
          id: response.data?.body?.data?.id ?? '',
          url: response.data?.body?.data?.url ?? '',
        };
        onClick(result);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error?.data?.meta?.message);
      }
      console.log({
        id: response.data?.body?.data?.id ?? '',
        url: response.data?.body?.data?.url ?? '',
      });
    } catch (error: unknown) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <Box>
      <Box className="rounded">
        <div
          onClick={() => {
            if (editMode) {
              if (videoRef.current) {
                videoRef.current.click();
              }
            }
          }}
          className="cursor-pointer border border-dashed border-text-link rounded-lg bg-surface-secondary h-[180px]"
        >
          {fileUploading ? (
            <Loading />
          ) : video ? (
            <video className="w-full h-full rounded-lg" controls>
              <source src={video} type="video/mp4"></source>
              Your browser does not support this feature.
            </video>
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
                src="/upload/images/image-input.png" // Update icon for videos
                alt="file input icon"
              />
              <Text className="text-xs pt-1">Upload Video</Text>
            </Flex>
          )}
        </div>
        <input
          ref={videoRef}
          type={'file'}
          multiple={false}
          accept="video/mp4, video/avi, video/mov" // Accept video file types
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
              if (videoRef.current) {
                videoRef.current.click();
              }
            }}
          >
            <Icons.Replace className="w-5 h-5" />
          </Flex>
          <Flex
            justify="center"
            align="center"
            className="w-8 h-8 rounded bg-surface-secondary cursor-pointer"
            onClick={() => deleteHandler('')}
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

export default VideoPicker;
