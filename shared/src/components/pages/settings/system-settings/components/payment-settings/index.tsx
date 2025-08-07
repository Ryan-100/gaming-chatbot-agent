'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Text, Box } from '@radix-ui/themes';
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
import { useGetPaymentSettingQuery } from '../../../../../../stores/reducers/payment-settings.reducer';
import { PaymentSettingEditDialog } from './PaymentSettingsEditDialog';
import EditButton from '../../../../../shared/buttons/EditButton';

const PaymentSettings = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const { data: paymentSettingData, isLoading } = useGetPaymentSettingQuery({});

  const form = useForm({
    defaultValues: {
      paymentChangeTime: paymentSettingData?.body?.data?.paymentChangeTime,
      paymentChangeType: paymentSettingData?.body?.data?.paymentChangeType,
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Card className="p-4">
        <Flex justify="between">
          <Text className="text-base font-bold">Payment</Text>
          <EditButton variant="outline" onClick={() => setModalIsOpen(true)} />
        </Flex>
        <Form {...form}>
          <form className="grid grid-cols-3 gap-4">
            <Box className="col-span-3 sm:col-span-2">
              <FormField
                control={form.control}
                name="paymentChangeTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Change Time</FormLabel>
                    <FormControl>
                      <InputAdornment
                        value={
                          paymentSettingData?.body?.data?.paymentChangeTime
                        }
                        disabled
                        endAdornment={
                          paymentSettingData?.body?.data?.paymentChangeType
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Box>
          </form>
        </Form>
      </Card>
      {paymentSettingData?.body?.data && (
        <PaymentSettingEditDialog
          data={paymentSettingData?.body?.data}
          open={modalIsOpen}
          onClose={setModalIsOpen}
        />
      )}
    </Box>
  );
};

export default PaymentSettings;
