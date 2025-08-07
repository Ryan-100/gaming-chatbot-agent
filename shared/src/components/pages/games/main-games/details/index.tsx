'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '../../../../ui/card';
import { Flex, Text, Box, Grid } from '@radix-ui/themes';
import Image from 'next/image';
import { Switch } from '../../../../ui/switch';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import Loading from '../../../../ui/loading';
import BasicInformationCard from './components/BasicInformationCard';
import MainGameEditModal from '../components/MainGameEditModal';
import { DataTable } from '../../../../shared/data-table';
import { childGameColumnDef } from './components/columDef';
import { useGetChildGameByMainQuery } from '../../../../../stores/reducers/child-games.reducer';
import {
  useGetMainGameDetailQuery,
  useUpdateGameMaintenanceMutation,
} from '../../../../../stores/reducers/main-games.reducer';
import { useGetLanguageQuery } from '../../../../../stores/reducers/language.reducer';

const MainGameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [openLangIconEdit, setOpenLangIconEdit] = useState(false);

  const [query, setQuery] = useState({
    main_game_id: parseInt(id),
    pageIndex: 1,
    rowPerPage: 20,
  });

  const handlePageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      rowPerPage: query.rowPerPage,
      main_game_id: query.main_game_id,
    });
  };

  const handleLangModalOpen = () => {
    setOpenLangIconEdit(true);
  };

  const handleLangModalClose = () => {
    setOpenLangIconEdit(false);
  };

  const { data: languageData, isLoading: languageLoading } =
    useGetLanguageQuery();

  const { data: gameDataById, isLoading: detailDataFetching } =
    useGetMainGameDetailQuery({ id });

  const { data: childGamesByMain, isLoading: tableDataFetching } =
    useGetChildGameByMainQuery(query);

  const [updateGameMaintenance] = useUpdateGameMaintenanceMutation();

  const detailData = gameDataById?.body?.data;

  const handleSwitchChange = async () => {
    try {
      const response = await updateGameMaintenance({
        data: {
          id: detailData?.id!,
          p_code: detailData?.p_code!,
          status: !detailData?.maintain_status,
        },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (detailDataFetching || tableDataFetching || languageLoading) {
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
                src={detailData?.mainGameLanguages[0]?.icon ?? ''}
                width={80}
                height={80}
                alt="game icon"
                className="rounded-lg "
              />
              <Text className="text-sm md:text-base lg:text-[20px] font-bold">
                {detailData?.game_name}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Text className="text-xs">Game Maintenance</Text>
              <Switch
                defaultChecked={detailData?.maintain_status}
                onCheckedChange={handleSwitchChange}
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
                Language & icon{' '}
              </Text>
              <Button size="sm" variant="success" onClick={handleLangModalOpen}>
                <Icons.Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Flex>
            <Box>
              {detailData?.mainGameLanguages?.map((item, index) => (
                <Box
                  className="border-b border-b-surface-secondary py-4"
                  key={index}
                >
                  <Grid
                    columns="3"
                    align="center"
                    justify="center"
                    className="gap-2"
                  >
                    <Text className="text-xs">{item.name}</Text>
                    <Text className="text-xs">{item.id}</Text>
                    <img
                      src={item.icon ?? ''}
                      alt="icon"
                      width={'24'}
                      height="24"
                      className="w-[24px] h-[24px]"
                    />
                  </Grid>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Flex>
      {detailData && <BasicInformationCard data={detailData} />}

      <Text className="font-bold text-sm md:text-base w-full pt-4 border-t border-border-secondary">
        {' '}
        Child Games{' '}
      </Text>

      <DataTable
        data={childGamesByMain?.body?.data ?? []}
        columns={childGameColumnDef}
        query={{
          pageIndex: query.pageIndex,
          rowPerPage: query.rowPerPage,
          total: childGamesByMain?.body?.total ?? 0,
          pageCount: childGamesByMain?.body?.pageCount ?? 0,
        }}
        onChange={handlePageChange}
      />

      {openLangIconEdit && detailData && (
        <MainGameEditModal
          languageData={languageData?.body?.data ?? []}
          data={detailData}
          open={openLangIconEdit}
          handleClose={handleLangModalClose}
        />
      )}
    </Flex>
  );
};

export default MainGameDetails;
