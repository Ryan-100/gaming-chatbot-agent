'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '../../../../ui/card';
import { Flex, Text, Box, Grid } from '@radix-ui/themes';
import Image from 'next/image';
import { Switch } from '../../../../ui/switch';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import BasicInformationCard from './components/BasicInformationCard';
import MainGameEditModal from '../components/MainGameEditModal';
import { languageData } from '../../../../../data/LanguageList';
import { DataTable } from '../../../../shared/data-table';
import { childGameColumnDef } from './components/columDef';
import { dummyChildGameList } from './components/mock';

const MainGameDetails = () => {
  const [openLangIconEdit, setOpenLangIconEdit] = useState(false);
  const [query, setQuery] = useState({
    pageIndex: 1,
    rowPerPage: 20,
  });

  const handlePageChange = (page: number) => {
    setQuery({ pageIndex: page, rowPerPage: query.rowPerPage });
  };

  const handleLangModalOpen = () => {
    setOpenLangIconEdit(true);
  };

  const handleLangModalClose = () => {
    setOpenLangIconEdit(false);
  };

  return (
    <Flex direction={'column'} className="gap-y-4">
      <Card>
        <CardContent>
          <Flex justify={'between'} className="pt-6" align={'center'}>
            <Flex align={'center'} className="gap-x-4 flex-1">
              <Image
                src={'/upload/images/temp.png'}
                width={80}
                height={80}
                alt="game icon"
                className="rounded-lg "
              />
              <Text className="text-[20px] font-bold "> Game Name </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Text className="text-xs"> Active </Text>
              <Switch />
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      <Flex className="gap-x-4">
        <Card className="flex-1">
          <CardContent className="w-full">
            <Flex className="w-full pt-4" justify={'between'}>
              <Text className="font-bold text-base"> Language & Icon </Text>
              <Button size="sm" variant="success" onClick={handleLangModalOpen}>
                <Icons.Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Flex>
            <Box>
              {languageData.map((item, index) => (
                <Box
                  className="border-b border-b-surface-secondary py-4"
                  key={index}
                >
                  <Grid columns="3" align="center" justify="center">
                    <Text className="text-xs">{item.label}</Text>
                    <Text className="text-xs">CG9</Text>
                    <Image
                      src={'/upload/images/temp.png'}
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
      <BasicInformationCard />

      <Text className="font-bold text-base"> Child Games </Text>

      <DataTable
        data={dummyChildGameList}
        columns={childGameColumnDef}
        query={{
          pageIndex: query.pageIndex,
          rowPerPage: query.rowPerPage,
          total: 20,
          pageCount: 1,
        }}
        onChange={handlePageChange}
      />

      <MainGameEditModal
        open={openLangIconEdit}
        handleClose={handleLangModalClose}
      />
    </Flex>
  );
};

export default MainGameDetails;
