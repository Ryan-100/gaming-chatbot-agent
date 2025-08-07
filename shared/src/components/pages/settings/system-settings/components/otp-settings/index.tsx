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
import { useGetOtpSettingQuery } from '../../../../../../stores/reducers/otp-settings.reducer';
import { OtpSettingEditDialog } from './OtpSettingsEditDialog';
import EditButton from '../../../../../shared/buttons/EditButton';

const OTPSettings = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const { data: otpSettingData, isLoading } = useGetOtpSettingQuery({});

  const form = useForm({
    defaultValues: {
      maxAttemptOtp: otpSettingData?.body?.data?.maxAttemptOtp,
      maxWrongOtp: otpSettingData?.body?.data?.maxWrongOtp,
      maxWrongPsw: otpSettingData?.body?.data?.maxWrongPsw,
      otpExpireTime: otpSettingData?.body?.data?.otpExpireTime,
      otpExpireType: otpSettingData?.body?.data?.otpExpireType,
      otpLockTime: otpSettingData?.body?.data?.otpLockTime,
      otpLockType: otpSettingData?.body?.data?.otpLockType,
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Card className="p-4">
        <Flex justify="between">
          <Text className="text-base font-bold">OTP</Text>
          <EditButton variant="outline" onClick={() => setModalIsOpen(true)} />
        </Flex>
        <Form {...form}>
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Box className="col-span-1">
              <FormField
                control={form.control}
                name="maxAttemptOtp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Attempt Otp</FormLabel>
                    <FormControl>
                      <Input
                        value={otpSettingData?.body?.data?.maxAttemptOtp}
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
                name="maxWrongOtp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Wrong Otp</FormLabel>
                    <FormControl>
                      <Input
                        value={otpSettingData?.body?.data?.maxWrongOtp}
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
                name="maxWrongPsw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Wrong Password</FormLabel>
                    <FormControl>
                      <Input
                        value={otpSettingData?.body?.data?.maxWrongPsw}
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
                name="otpExpireTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Otp Expired Time</FormLabel>
                    <FormControl>
                      <InputAdornment
                        value={otpSettingData?.body?.data?.otpExpireTime}
                        disabled
                        endAdornment={otpSettingData?.body?.data?.otpExpireType}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Box>
            <Box className="col-span-1">
              <FormField
                control={form.control}
                name="otpLockTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Otp Locked Time</FormLabel>
                    <FormControl>
                      <InputAdornment
                        value={otpSettingData?.body?.data?.otpLockTime}
                        disabled
                        endAdornment={otpSettingData?.body?.data?.otpLockType}
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
        <OtpSettingEditDialog
          data={otpSettingData?.body?.data}
          open={modalIsOpen}
          onClose={setModalIsOpen}
        />
      )}
    </Box>
  );
};

export default OTPSettings;
