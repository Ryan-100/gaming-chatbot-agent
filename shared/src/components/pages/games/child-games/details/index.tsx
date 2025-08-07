'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '../../../../ui/card';
import { Flex, Text, Box, Grid } from '@radix-ui/themes';
import { Switch } from '../../../../ui/switch';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import Loading from '../../../../ui/loading';
import { languageData } from '../../../../../data/LanguageList';
import BasicInformationCard from './components/BasicInformationCard';
import ChildGameEditModal from './components/ChildGameEditModal';
import { useGetChildGameDetailQuery } from 'shared/src/stores/reducers/child-games.reducer';

const ChildGameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [openLangIconEdit, setOpenLangIconEdit] = useState(false);

  const { data: gameDataById, isLoading: detailDataFetching } =
    useGetChildGameDetailQuery({ id });
  const detailData = gameDataById?.body?.data;

  const handleLangModalOpen = () => {
    setOpenLangIconEdit(true);
  };

  const handleLangModalClose = () => {
    setOpenLangIconEdit(false);
  };

  if (detailDataFetching) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} className="mt-4 gap-y-4">
      <Card>
        <CardContent>
          <Flex
            justify={'between'}
            className="pt-6 flex-col md:flex-row items-start md:items-center gap-4"
          >
            <Flex align={'center'} className="gap-2 flex-1 flex-wrap">
              <img
                src={detailData?.icon_mm ?? ''}
                width={80}
                height={80}
                alt="game icon"
                className="rounded-lg "
              />
              <Text className="text-sm md:text-base lg:text-[20px] font-bold">
                {detailData?.game_name_en}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Text className="text-xs">
                {detailData?.is_active ? 'Active' : 'Inactive'}{' '}
              </Text>
              <Switch
                defaultChecked={detailData?.is_active}
                className="cursor-not-allowed"
                disabled
              />
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      <Flex className="gap-x-4">
        <Card className="flex-1">
          <CardContent className="w-full">
            <Flex className="w-full pt-4 flex-wrap gap-2" justify={'between'}>
              <Text className="font-bold text-sm md:text-base">
                {' '}
                Language & Icon{' '}
              </Text>
              <Button size="sm" variant="success" onClick={handleLangModalOpen}>
                <Icons.Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Flex>
            <Box>
              <Box className="border-b border-b-surface-secondary py-4">
                <Grid
                  columns="3"
                  align="center"
                  justify="center"
                  className="gap-2"
                >
                  <Text className="text-xs">English</Text>
                  <Text className="text-xs">{detailData?.game_name_en}</Text>
                  <img
                    src={detailData?.icon_en ?? ''}
                    alt="icon"
                    width={'24'}
                    height="24"
                    className="w-[24px] h-[24px]"
                  />
                </Grid>
              </Box>
              <Box className="border-b border-b-surface-secondary py-4">
                <Grid
                  columns="3"
                  align="center"
                  justify="center"
                  className="gap-2"
                >
                  <Text className="text-xs">Chinese</Text>
                  <Text className="text-xs">{detailData?.game_name_zh}</Text>
                  <img
                    src={detailData?.icon_zh ?? ''}
                    alt="icon"
                    width={'24'}
                    height="24"
                    className="w-[24px] h-[24px]"
                  />
                </Grid>
              </Box>
              <Box className="py-4">
                <Grid
                  columns="3"
                  align="center"
                  justify="center"
                  className="gap-2"
                >
                  <Text className="text-xs">Myanmar</Text>
                  <Text className="text-xs">{detailData?.game_name_mm}</Text>
                  <img
                    src={detailData?.icon_mm ?? ''}
                    alt="icon"
                    width={'24'}
                    height="24"
                    className="w-[24px] h-[24px]"
                  />
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Flex>
      {detailData && <BasicInformationCard data={detailData} />}
      {openLangIconEdit && detailData && (
        <ChildGameEditModal
          data={detailData}
          open={openLangIconEdit}
          handleClose={handleLangModalClose}
        />
      )}
    </Flex>
  );
};

export default ChildGameDetail;
