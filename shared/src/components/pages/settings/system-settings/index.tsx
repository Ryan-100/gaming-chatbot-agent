'use client';
import React from 'react';
import { Box, Text } from '@radix-ui/themes';
import { Card } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import Loading from '../../../ui/loading';
import ApplicationSettings from './components/application-settings';
import OTPSettings from './components/otp-settings';
import PaymentSettings from './components/payment-settings';
import {
  useGetSystemMaintenanceQuery,
  useUpdateSystemMaintenanceMutation,
} from '../../../../stores/reducers/system-maintenance.reducer';

const SystemSettings = () => {
  const { data: systemMaintenanceData, isLoading } =
    useGetSystemMaintenanceQuery({});

  const [updateSystemMaintenance] = useUpdateSystemMaintenanceMutation();
  const handleSwitchChange = () => {
    updateSystemMaintenance({});
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className="space-y-4 mb-4">
      <Card className="p-4 flex items-center justify-between">
        <Text className="text-sm font-medium">System Maintenance</Text>
        <Switch
          defaultChecked={
            systemMaintenanceData?.body?.data?.systemMaintenance || false
          }
          onCheckedChange={handleSwitchChange}
        />
      </Card>
      <ApplicationSettings />
      <OTPSettings />
      <PaymentSettings />
    </Box>
  );
};

export default SystemSettings;
