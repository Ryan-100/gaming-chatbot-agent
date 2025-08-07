'use client';
import React, { ChangeEvent, useRef, useState } from 'react';
import { Dialog, DialogContent } from '../../../ui/dialog';
import { Box, Flex } from '@radix-ui/themes';
import { Image } from '../../../ui/image';
import { Plus, RefreshCcw, X } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { ChatRoomListData } from '../../../../types/chat.types';
import { getAttachmentType, getFileType } from '../../../../utils/getFileType';
import { Socket } from 'socket.io-client';
import { useSendMessageMutation } from '../../../../stores/reducers/chat.reducer';
import { toast } from 'sonner';

interface ImageEditProps {
  images: File[];
  setImages: (value: File[]) => void;
  imagesEditDialog: boolean;
  setImagesEditDialog: (value: boolean) => void;
  addHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedChat: ChatRoomListData | null;
  socket: Socket;
  messageSize: number;
}

const ImageEditDialog: React.FC<ImageEditProps> = ({
  images,
  setImages,
  imagesEditDialog,
  setImagesEditDialog,
  addHandler,
  selectedChat,
  socket,
  messageSize,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState('');

  const [sendAction, { isLoading }] = useSendMessageMutation();

  const handleAddClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const reuploadHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newImages = [...images];
      newImages[index] = files[0];
      setImages(newImages);
    }
  };

  const removeHandler = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleChangeFile = async () => {
    if (images) {
      const updatedData = {
        chatRoomId: selectedChat?.id ?? '',
        caption: caption,
        content: getFileType(images[0].name),
        attachments: images,
        isPinned: false,
        attachmentType: getAttachmentType(getFileType(images[0]?.name)),
      };
      if (socket) {
        try {
          const response = await sendAction(updatedData);
          if (response.data?.meta?.success) {
            socket.emit('get-messages', {
              roomId: selectedChat?.id ?? '',
              page: 1,
              size: messageSize,
            });
            setImagesEditDialog(false);
            setImages([]);
            setCaption('');
          } else {
            const errorResponse: any = response;
            toast.error(errorResponse?.error.data?.meta?.message);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const isVideoPresent = images.some(
    (item) => getFileType(item?.name) === 'video'
  );

  return (
    <Dialog open={imagesEditDialog} onOpenChange={setImagesEditDialog}>
      <DialogContent className="w-[85%] md:w-[600px]">
        <div>Send image</div>
        <Box className="space-y-2">
          {images &&
            images.map((item, index) => {
              const fileType = getFileType(item.name);
              return (
                <Box
                  key={index}
                  className="p-4 bg-surface-brandLight rounded-lg"
                >
                  {fileType === 'video' ? (
                    <video
                      src={URL.createObjectURL(item)}
                      controls
                      className="h-[300px] w-[500px] z-1 rounded-lg object-cover"
                    />
                  ) : (
                    <Image
                      src={URL.createObjectURL(item)}
                      width={400}
                      height={200}
                      className="h-[300px] w-[500px] z-1 rounded-lg object-cover"
                      alt="uploaded media"
                    />
                  )}
                  <Flex className="space-x-4 pt-4" justify="end">
                    <label htmlFor={`reupload-${index}`}>
                      <RefreshCcw className="cursor-pointer" />
                      <input
                        type="file"
                        id={`reupload-${index}`}
                        className="hidden"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => reuploadHandler(e, index)}
                      />
                    </label>
                    <X
                      className="cursor-pointer"
                      onClick={() => removeHandler(index)}
                    />
                  </Flex>
                </Box>
              );
            })}
        </Box>
        <Box>
          <div className="text-sm mb-2">
            Caption <span className="text-text-secondary">(Optional)</span>
          </div>
          <Input
            placeholder="Add a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </Box>
        <Flex justify="between" className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            onChange={addHandler}
          />
          <Button
            variant="outline"
            onClick={handleAddClick}
            disabled={isVideoPresent || images.length === 5}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
          <Flex className="space-x-4">
            <Button
              variant="link"
              className="px-6 text-text-primary"
              onClick={() => {
                setCaption('');
                setImages([]);
                setImagesEditDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="px-6"
              onClick={handleChangeFile}
              loading={isLoading}
            >
              Send
            </Button>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditDialog;
