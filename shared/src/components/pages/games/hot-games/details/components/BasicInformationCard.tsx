import React, { useState } from 'react';
import { Card, CardContent } from '../../../../../ui/card';
import { Flex, Text } from '@radix-ui/themes';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import InformationEditModal from './InformationEditModal';
import PropsTable from '../../../../../shared/PropsTable';

const BasicInformationCard = () => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEditClick = () => {
    setOpenEditModal(true);
  };

  const propsTable = (
    <PropsTable
      rows={[
        {
          key: 'Game Id',
          value: '1',
        },
        {
          key: 'Game Id',
          value: '1',
        },
      ]}
    />
  );

  return (
    <>
      <Card className="flex-1">
        <CardContent>
          <Flex className="w-full py-4" justify="between">
            <Text className="font-bold text-base"> Basic Information </Text>
            <Button size="sm" variant="success" onClick={handleEditClick}>
              <Icons.Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Flex>
          {propsTable}
        </CardContent>
      </Card>
      <InformationEditModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
      />
    </>
  );
};

export default BasicInformationCard;
