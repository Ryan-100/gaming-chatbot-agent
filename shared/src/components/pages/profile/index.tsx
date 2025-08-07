'use client';
import React from 'react';
import dayjs from '../../../utils/dayjs';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import Loading from '../../ui/loading';
import { ChangePasswordDialog } from './components/ChangePasswordDialog';
import LoginActivityTable from './components/LoginActivityTable';
import { useGetMeQuery } from '../../../stores/reducers/auth.reducer';
import { maskChar, maskEmail } from '../../../utils/maskChar';

const Profile = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const { data, isLoading } = useGetMeQuery();

  const detailData = data?.body?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className="space-y-6">
      <Box className="space-y-4">
        <Text className="text-lg font-bold">Profile</Text>
        <Card className="flex justify-between items-start flex-wrap gap-4 p-8">
          <div className="gap-6 flex flex-col md:flex-row w-full md:w-1/3">
            <Avatar className="w-[120px] h-[120px]">
              <AvatarImage src={'/upload/images/logo.png'} alt="@shadcn" />
              <AvatarFallback>{detailData?.name}</AvatarFallback>
            </Avatar>
            <Box className="space-y-4 text-xs w-full">
              <Flex direction="column" className="space-y-2">
                <Text className="text-lg font-medium">{detailData?.name}</Text>
                <Text className="text-text-secondary">
                  Agent ID: {detailData?.agentCode}
                </Text>
              </Flex>
              <Flex direction="column" className="space-y-4">
                <Flex className="!items-center !justify-between">
                  <Text className="font-semibold">Phone:&nbsp;</Text>
                  <Text className="">{maskChar(detailData?.phone ?? '')}</Text>
                </Flex>
                <Flex className="!items-center !justify-between">
                  <Text className="font-semibold">Email:&nbsp;</Text>
                  <Text className="">{maskEmail(detailData?.email ?? '')}</Text>
                </Flex>
                <Flex className="!items-center !justify-between">
                  <Text className="font-semibold">Joined:&nbsp;</Text>
                  <Text className="w-32 min-w-32">
                    {dayjs(detailData?.createdAt ?? '').format(
                      'DD MMM YYYY, h:mm A'
                    )}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </div>
          <Button size="sm" onClick={() => setModalOpen(true)}>
            Change Password
          </Button>
        </Card>
      </Box>
      <Box className="space-y-4">
        <Text className="text-lg font-bold">Login Activity</Text>
        <LoginActivityTable data={detailData?.AdminLoginActivity ?? []} />
      </Box>
      {modalOpen && (
        <ChangePasswordDialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default Profile;
