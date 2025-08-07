'use client';
import { Image } from '../../../ui/image';
import { Box, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { X } from 'lucide-react';
import useDownloader from 'react-use-downloader';

interface IMenuCard {
  message: string;
  url: string;
  time: string;
}

const DownloadFileReply = (data: IMenuCard) => {
  const [loading, setLoading] = useState(false);
  const { download, isInProgress, percentage, cancel, error } = useDownloader();

  const handleDownload = () => {
    setLoading(true);
    download(data?.url, data.message).finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="w-[250px] h-[75px]">
        <div className="w-[100%] rounded-md cursor-pointer bg-surface-brandLight">
          <Flex direction="column" justify="start" className="p-3" gap="1">
            <Flex className="space-x-2">
              {loading ? (
                <Flex
                  className="w-[48px] h-[48px] relative"
                  justify="center"
                  align="center"
                  onClick={cancel}
                >
                  <div className="absolute w-[48px] h-[48px] border-2 border-t-white border-border-accent rounded-full animate-spin"></div>
                  <X className="w-[24px] h-[24px] text-white" />
                </Flex>
              ) : (
                <Flex
                  justify="center"
                  onClick={handleDownload}
                  className="min-w-[50px] h-[50px] bg-white rounded"
                >
                  <Image
                    src={'/upload/icons/file-icon.svg'}
                    alt="file-icon"
                    width={28}
                    height={28}
                  />
                </Flex>
              )}
              <Box className="text-[12px] text-black w-[150px] h-[50px] line-clamp-3">
                {isInProgress ? `Downloading... ${percentage}%` : data.message}
              </Box>
            </Flex>
          </Flex>
        </div>
      </div>
      <div className="text-[10px] pt-[1px] text-text-secondary text-left">
        {data.time}
      </div>
    </div>
  );
};

export default DownloadFileReply;
