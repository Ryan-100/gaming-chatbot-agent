import { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Input } from '../../../../ui/input';
import { useGetSpinSettingQuery } from '../../../../../stores/reducers/spin-setting.reducer';
import Loading from '../../../../ui/loading';
import UpdateSpinSettingDialog from './UpdateSpinSettingDialog';
import { Card, CardContent } from '../../../../ui/card';
import { toast } from 'sonner';
import EditButton from '../../../../shared/buttons/EditButton';

const SpinSetting = () => {
  const [enableEditMode, setEnableEditMode] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error: spinSettingError,
  } = useGetSpinSettingQuery();

  const settings = data?.body?.data;

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    const error: any = spinSettingError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Flex align="center" justify="between" className="py-4">
            <div className="text-sm font-semibold"> Spin Settings </div>
            <EditButton
              variant="outline"
              size="sm"
              onClick={() => setEnableEditMode(true)}
            />
          </Flex>

          <Flex
            direction={'column'}
            gap={'3'}
            className="w-full justify-between"
          >
            <Flex
              justify={'start'}
              gap={'3'}
              className="flex-wrap flex-col md:flex-row"
            >
              <Box className="flex-1">
                <Text className="text-xs"> Winning Chance </Text>
                <Input
                  value={settings?.winChance}
                  readOnly
                  type="number"
                  postfix={<Text className="text-sm">%</Text>}
                />
              </Box>

              <Box className="flex-1">
                <Text className="text-xs"> Maximum Spin Limit</Text>
                <Input value={settings?.maxSpinLimit} readOnly type="number" />
              </Box>
            </Flex>

            <Flex
              justify={'start'}
              gap={'3'}
              className="flex-wrap flex-col md:flex-row"
            >
              <Box className="flex-1">
                <Text className="text-xs"> Spin Bonus Expire After </Text>
                <Input
                  value={settings?.bonusExpireDate}
                  readOnly
                  type="number"
                  postfix={
                    <Text className="text-sm">
                      {' '}
                      {settings?.bonusExpireType || 'Days'}{' '}
                    </Text>
                  }
                />
              </Box>

              <Box className="flex-1">
                <Text className="text-xs"> Turnover Rate </Text>
                <Input
                  value={settings?.turnOverRate}
                  readOnly
                  type="number"
                  postfix={<Text className="text-sm">X</Text>}
                />
              </Box>
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      {enableEditMode && (
        <UpdateSpinSettingDialog
          open={enableEditMode}
          handleClose={() => setEnableEditMode(false)}
          data={settings}
        />
      )}
    </Box>
  );
};
export default SpinSetting;
