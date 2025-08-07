import React from 'react';
import { toast } from 'sonner';
import { Box, Text } from '@radix-ui/themes';
import { Image } from '../../../../ui/image';
import { Icons } from '../../../../ui/icons';
import { cn } from '../../../../../utils/cn';
import { GuideListData } from '../../../../../../src/types/guide.types';
import { useCreateFileMutation } from '../../../../../stores/reducers/file-upload.reducer';
import GuideLoading from './GuideLoading';

interface MediaData {
  id: string;
  url: string;
  order: number;
}

type FileType = {
  title: string;
  media: MediaData;
  index?: number;
  isUpdate?: boolean;
  languageData: GuideListData;
  data: GuideListData[];
  setData: React.Dispatch<React.SetStateAction<GuideListData[]>>;
};

const FileUploader: React.FC<FileType> = ({
  title,
  media,
  index = 0,
  isUpdate,
  languageData,
  data,
  setData,
}) => {
  const [file, setFile] = React.useState<MediaData | null>(media);
  const [createImage, { isLoading: fileUploading }] = useCreateFileMutation();

  const updateFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileData = event.target.files[0];
      try {
        const response = await createImage({ file: fileData });

        if (response?.data?.meta?.success) {
          toast.success(`Successfully uploaded your file!`);
          const newFile = {
            id: response?.data?.body?.data?.id ?? '',
            url: response?.data?.body?.data?.url ?? '',
            order: index + 1,
          };
          setData((prevData) => {
            return prevData.map((langData) => {
              if (langData.langId === languageData.langId) {
                if (title === 'Image') {
                  const updatedImages = langData.images.map((img, imgIndex) =>
                    imgIndex === index ? newFile : img
                  );
                  return { ...langData, images: updatedImages };
                } else if (title === 'Video') {
                  return { ...langData, videos: [newFile] };
                }
              }
              return langData;
            });
          });
          setFile(newFile);
        } else {
          toast.error(`Error: ${response.data?.meta?.message}`);
        }
      } catch (error) {
        toast(`Error: ${error}`);
        return;
      }
    }
  };

  const moveFile = (direction: 'up' | 'down') => {
    if (title === 'Image' && index !== undefined) {
      setData((prevData) => {
        return prevData.map((langData) => {
          if (langData.langId === languageData.langId) {
            const updatedImages = [...langData.images];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= updatedImages.length) {
              // Return early if the move is out of bounds
              console.log('Move out of bounds, no update made.');
              return langData;
            }

            const updatedCurrentImage = { ...updatedImages[index] };
            const updatedTargetImage = { ...updatedImages[targetIndex] };

            // Swap URLs
            const tempUrl = updatedCurrentImage.url;
            updatedCurrentImage.url = updatedTargetImage.url;
            updatedTargetImage.url = tempUrl;

            const tempId = updatedCurrentImage.id;
            updatedCurrentImage.id = updatedTargetImage.id;
            updatedTargetImage.id = tempId;

            updatedImages[index] = updatedCurrentImage;
            updatedImages[targetIndex] = updatedTargetImage;
            return { ...langData, images: updatedImages };
          }
          return langData;
        });
      });
    }
  };

  const deleteFile = () => {
    setData((prevData) => {
      return prevData.map((langData) => {
        if (langData.langId === languageData.langId) {
          if (title === 'Image') {
            const updatedImages = [...langData.images];
            if (index !== undefined && index < updatedImages.length) {
              updatedImages[index].url = '';
            }
            return { ...langData, images: updatedImages };
          } else if (title === 'Video') {
            return {
              ...langData,
              videos: [{ ...langData.videos[0], url: '' }],
            };
          }
        }
        return langData;
      });
    });
    setFile((prevFile) => {
      return prevFile ? { ...prevFile, url: '' } : null;
    });
  };
  return (
    <Box className="relative">
      <Text className="text-xs">{title}</Text>
      {file?.url && !fileUploading ? (
        <Box className="w-full space-y-2">
          {title === 'Image' ? (
            <Image
              src={file?.url}
              alt={`uploaded ${title}`}
              width={300}
              height={160}
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <video
              src={file?.url}
              poster={isUpdate ? undefined : '/upload/images/poster.png'}
              controls={isUpdate}
              className="w-full h-40 object-cover rounded-lg"
            />
          )}
          {isUpdate && (
            <Box className="w-full !flex justify-center items-center space-x-4">
              <label
                htmlFor={file?.id ?? ''}
                className="w-8 h-8 !flex items-center justify-center rounded-sm bg-neutral-300 cursor-pointer"
              >
                <input
                  id={file?.id ?? ''}
                  type="file"
                  accept={title === 'Image' ? '.jpg,.png' : 'video/mp4'}
                  onChange={updateFile}
                  hidden
                />
                <Icons.Replace className="w-4 h-4" />
              </label>
              <Box
                className="w-8 h-8 !flex items-center justify-center rounded-sm bg-neutral-300 cursor-pointer"
                onClick={deleteFile}
              >
                <Icons.Trash className="w-4 h-4 text-primary" />
              </Box>
              {title === 'Image' && (
                <Box
                  className="w-8 h-8 !flex items-center justify-center rounded-sm bg-neutral-300 cursor-pointer"
                  onClick={() => moveFile('down')}
                >
                  <Icons.ArrowDown
                    className={cn('w-4 h-4', index === 3 && 'text-neutral-500')}
                  />
                </Box>
              )}
              {title === 'Image' && (
                <Box
                  className="w-8 h-8 !flex items-center justify-center rounded-sm bg-neutral-300 cursor-pointer"
                  onClick={() => moveFile('up')}
                >
                  <Icons.ArrowUp
                    className={cn('w-4 h-4', index === 0 && 'text-neutral-500')}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      ) : fileUploading ? (
        <GuideLoading type="Image" />
      ) : (
        <label
          htmlFor={file?.id ?? ''}
          className="w-full h-40 rounded-lg border border-dashed border-blue-600 flex flex-col items-center justify-center cursor-pointer"
        >
          <input
            id={file?.id ?? ''}
            type="file"
            accept={title === 'Image' ? '.jpg,.png' : 'video/mp4'}
            onChange={updateFile}
            hidden
          />
          <Image
            src={
              title === 'Image'
                ? '/upload/icons/add-image-icon.svg'
                : '/upload/icons/add-video-icon.svg'
            }
            alt="add image"
            width={42}
            height={42}
          />
          <Text className="text-xs mt-2">Add {title}</Text>
        </label>
      )}
    </Box>
  );
};

export default React.memo(FileUploader);
