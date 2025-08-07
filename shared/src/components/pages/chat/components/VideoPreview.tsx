import { Icons } from '../../../ui/icons';
import * as Dialog from '@radix-ui/react-dialog';
import { Flex } from '@radix-ui/themes';
import { X } from 'lucide-react';
import useDownloader from 'react-use-downloader';
import Loading from '../../../ui/loading';

interface Props {
  open: boolean;
  video: string;
  handleClose: () => void;
  time: string;
  caption: string;
}

const VideoPreview = ({ open, video, handleClose, time, caption }: Props) => {
  const { download, isInProgress, percentage, cancel, error } = useDownloader();

  const handleDownload = () => {
    download(video, caption);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Content className="flex justify-center items-center fixed top-0 left-0 w-full h-full">
          <div className="max-w-[460px] w-[85%] h-[500px] bg-neutral-700">
            <Flex
              direction="column"
              justify="center"
              align="center"
              className="relative h-full max-w-[480px]"
            >
              <Flex align="center" justify="between" className="px-6 w-full">
                <Flex
                  align="center"
                  className="gap-x-4 text-white cursor-pointer"
                >
                  <X onClick={handleClose} />
                  <div>{time}</div>
                </Flex>
                <Flex
                  direction={'row'}
                  className="absolute right-0 cursor-pointer gap-x-3 pr-4"
                  gap="3"
                  onClick={handleDownload}
                >
                  {isInProgress ? (
                    <Loading />
                  ) : (
                    <Icons.Download className="w-6 h-6 text-white" />
                  )}
                </Flex>
              </Flex>

              <div className="mt-[20px] w-full">
                <video controls className="w-full h-[400px] mx-auto">
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Flex>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default VideoPreview;
