'use client';
import React from 'react';
import { Card, CardContent } from '../../../../../ui/card';
import { Flex, Text } from '@radix-ui/themes';
import { ChildGameDetailData } from '../../../../../../types/child-games.types';
import PropsTable from '../../../../../shared/PropsTable';

interface BasicInformationCardProps {
  data: ChildGameDetailData;
}

const BasicInformationCard = ({ data }: BasicInformationCardProps) => {
  const propsTable = (
    <PropsTable
      rows={[
        {
          key: 'Game Id',
          value: data?.id,
        },
        {
          key: 'Sort No.',
          value: data?.sorting,
        },
        {
          key: 'Status',
          value: data?.is_active ? 'Active' : 'Inactive',
        },
        {
          key: 'Type',
          value: data?.gameType?.name,
        },
        {
          key: 'Code',
          value: data?.gameType?.code,
        },
        {
          key: 'Main Game',
          value: data?.mainGames?.game_name,
        },
      ]}
    />
  );

  return (
    <Card className="flex-1">
      <CardContent>
        <Flex className="w-full py-4" justify="between">
          <Text className="font-bold text-sm md:text-base">
            {' '}
            Basic Information{' '}
          </Text>
        </Flex>
        {propsTable}
      </CardContent>
    </Card>
  );
};

export default BasicInformationCard;
