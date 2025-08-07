'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Text, Box } from '@radix-ui/themes';
import { Input } from '../../../../../ui/input';
import { Card } from '../../../../../ui/card';
import { InputAdornment } from '../../../../../ui/input-adornment';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import Loading from '../../../../../ui/loading';
import { useGetApplicationSettingQuery } from '../../../../../../stores/reducers/application-settings.reducer';
import { ApplicationSettingEditDialog } from './ApplicationSettingsEditDialog';
import EditButton from '../../../../../shared/buttons/EditButton';

const ApplicationSettings = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const { data: applicationSettingData, isLoading } =
    useGetApplicationSettingQuery({});

  const form = useForm({
    defaultValues: {
      appLockTime: applicationSettingData?.body?.data?.appLockTime,
      unitType: applicationSettingData?.body?.data?.unitType,
      language: applicationSettingData?.body?.data?.language,
      version: applicationSettingData?.body?.data?.version,
      appUrl: applicationSettingData?.body?.data?.appUrl,
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Card className="p-4">
        <Flex justify="between">
          <Text className="text-base font-bold">Application</Text>
          <EditButton variant="outline" onClick={() => setModalIsOpen(true)} />
        </Flex>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Box className="col-span-1">
                <FormField
                  control={form.control}
                  name="appLockTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Locked Time</FormLabel>
                      <FormControl>
                        <InputAdornment
                          value={
                            applicationSettingData?.body?.data?.appLockTime
                          }
                          endAdornment={
                            applicationSettingData?.body?.data?.unitType
                          }
                          disabled
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Box>
              <Box className="col-span-1">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input
                          value={applicationSettingData?.body?.data?.language}
                          disabled
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Box>
              <Box className="col-span-1">
                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>App Version</FormLabel>
                      <FormControl>
                        <Input
                          value={applicationSettingData?.body?.data?.version}
                          disabled
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Box>
            </div>
            <Box className="">
              <FormField
                control={form.control}
                name="appUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>App Landing URL</FormLabel>
                    <FormControl>
                      <Input
                        value={applicationSettingData?.body?.data?.appUrl}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Box>
          </form>
        </Form>
      </Card>
      {modalIsOpen && (
        <ApplicationSettingEditDialog
          data={applicationSettingData?.body?.data}
          open={modalIsOpen}
          onClose={setModalIsOpen}
        />
      )}
    </Box>
  );
};

export default ApplicationSettings;
