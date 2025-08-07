import React, { useState } from 'react';
import { Card, CardContent } from '../../../../../ui/card';
import { Flex, Text } from '@radix-ui/themes';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import InformationEditModal from './InformationEditModal';
import PropsTable from '../../../../../shared/PropsTable';
import { MainGameDetailData } from '../../../../../../types/main-games.types';

interface BasicInformationCardProps {
  data: MainGameDetailData;
}

const BasicInformationCard = ({ data }: BasicInformationCardProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEditClick = () => {
    setOpenEditModal(true);
  };

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
          key: 'Code',
          value: data?.gameType[0]?.code,
        },
        {
          key: 'Has Child?',
          value: data?.has_child ? 'Yes' : 'No',
        },
        {
          key: 'Maintain Start Date',
          value: data?.maintain_start_date,
        },
        {
          key: 'Maintain End Date',
          value: data?.maintain_end_date,
        },
      ]}
    />
  );

  return (
    <>
      <Card className="flex-1">
        <CardContent>
          <Flex className="w-full py-4 flex-wrap gap-2" justify="between">
            <Text className="font-bold text-sm md:text-base">
              {' '}
              Basic Information{' '}
            </Text>
            <Button size="sm" variant="success" onClick={handleEditClick}>
              <Icons.Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Flex>
          {propsTable}
        </CardContent>
      </Card>
      {openEditModal && (
        <InformationEditModal
          data={data}
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
        />
      )}
    </>
  );
};

export default BasicInformationCard;
