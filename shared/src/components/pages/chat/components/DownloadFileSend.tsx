'use client';
import { Image } from '../../../ui/image';
import { Box, Flex, Grid } from '@radix-ui/themes';

interface IMenuCard {
  message: string;
  url: string;
  time: string;
}

const DownloadFileSend = (data: IMenuCard) => {
  const handleOpenFile = () => {
    window.open(data.url);
  };

  return (
    <Grid className="w-full gap-1">
      <Flex direction="column" justify="end">
        <div className="relative flex flex-col items-end">
          <div className="w-[250px] h-[70px]">
            <div className="w-[100%] rounded-md cursor-pointer bg-primary">
              <Flex direction="column" justify="start" className="p-3" gap="1">
                <Flex className="space-x-2">
                  <Flex
                    justify="center"
                    onClick={handleOpenFile}
                    className="min-w-[50px] min-h-[50px] bg-white rounded"
                  >
                    <Image
                      src={'/upload/icons/file-icon.svg'}
                      alt="file-icon"
                      width={28}
                      height={28}
                    />
                  </Flex>
                  <Box className="text-[12px] text-white">{data.message}</Box>
                </Flex>
              </Flex>
            </div>
          </div>
          <div className="text-[10px] pt-[3px] text-text-secondary text-left">
            {data.time}
          </div>
        </div>
      </Flex>
    </Grid>
  );
};

export default DownloadFileSend;
