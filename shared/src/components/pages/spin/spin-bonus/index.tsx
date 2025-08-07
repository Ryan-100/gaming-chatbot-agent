'use client';
import React, { useState } from 'react';
import { Flex, Box, Text } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { columnDef } from './components/ColumnDef';
import { BreadcrumbLink, PageBreadcrumb } from '../../../shared/PageBreadCrumb';
import SpinSetting from './components/SpinSetting';
import SpinRule from './components/SpinRule';
import { useGetSpinBonusListQuery } from '../../../../stores/reducers/spin-bonus.reducer';
import {
  useGetSpinMaintenanceQuery,
  useUpdateSpinMaintenanceMutation,
} from '../../../../stores/reducers/spin-maintain.reducer';
import Loading from '../../../ui/loading';
import CreateUpdateSpinBonusModal from './components/CreateUpdateSpinBonusFormDialog';
import { Switch } from '../../../ui/switch';
import { Card } from '../../../ui/card';
import { toast } from 'sonner';
import { useGetLanguageQuery } from '../../../../stores/reducers/language.reducer';
import { useGetSpinRulesQuery } from '../../../../stores/reducers/spin-rules.reducer';
import CreateButton from '../../../shared/buttons/CreateButton';

const breadCrumbs: BreadcrumbLink[] = [
  { label: 'Spin', href: '/spin-bonus' },
  { label: 'Spin Setting', href: '/spin-bonus' },
];

const SpinBonus = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data,
    isLoading: fetchingSpinBonus,
    isError: isSpinBonusError,
    error: spinBonusError,
  } = useGetSpinBonusListQuery();

  const { data: lanData } = useGetLanguageQuery();
  const { data: spinRuleData } = useGetSpinRulesQuery();

  const languageData = lanData?.body?.data ?? [];

  const {
    data: spinMaintenanceData,
    isLoading: fetchingSpinMaintainData,
    isError: isMaintainfetchingError,
    error: maintainError,
  } = useGetSpinMaintenanceQuery({});

  const [updateSpinMaintenance] = useUpdateSpinMaintenanceMutation();

  const handleSwitchChange = () => {
    updateSpinMaintenance({});
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleCreateClick = () => {
    setModalOpen(true);
  };

  if (fetchingSpinBonus || fetchingSpinMaintainData) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loading />
      </div>
    );
  }

  if (isSpinBonusError) {
    const error: any = spinBonusError;
    toast.error(error?.data?.meta?.message);
  }

  if (isMaintainfetchingError) {
    const error: any = maintainError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Flex direction={'column'} gap="4">
      <Flex justify="between" align={'center'}>
        <PageBreadcrumb links={breadCrumbs} />
        <CreateButton 
          onClick={handleCreateClick} 
        />
      </Flex>

      <Box>
        {data?.body && (
          <DataTable
            data={data?.body?.data}
            columns={columnDef}
            hidePagination
          />
        )}
      </Box>

      <Card className="p-4 flex items-center justify-between">
        <Text className="text-sm font-medium">Spin Maintenance</Text>
        <Flex className="gap-x-2">
          <Switch
            defaultChecked={
              spinMaintenanceData?.body?.data?.maintenance || false
            }
            onCheckedChange={handleSwitchChange}
          />
          <Text className="text-sm font-medium">
            {spinMaintenanceData?.body?.data?.maintenance ? 'On' : 'Off'}
          </Text>
        </Flex>
      </Card>

      <SpinSetting />

      {spinRuleData?.body?.data && (
        <SpinRule
          languageData={languageData}
          data={spinRuleData?.body?.data ?? []}
        />
      )}

      {modalOpen && (
        <CreateUpdateSpinBonusModal
          open={modalOpen}
          onClose={handleModalClose}
          title="Create New Spin Bonus"
          yesLabel="create"
        />
      )}
    </Flex>
  );
};

export default SpinBonus;
