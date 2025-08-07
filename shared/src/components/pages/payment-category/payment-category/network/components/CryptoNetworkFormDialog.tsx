import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import { Checkbox } from '../../../../../ui/checkbox';
import { Label } from '../../../../../ui/label';
import {
  CreateCryptoNetworkForm,
  createCryptoNetworkSchema,
  CryptoNetworkListData,
} from '../.../../../../../../../types/crypto-network.types';
import { Input } from '../../../../../ui/input';
import { Flex } from '@radix-ui/themes';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import {
  useCreateCryptoNetworkMutation,
  useUpdateCryptoNetworkMutation,
} from '../.../../../../../../../stores/reducers/crypto-network.reducer';
import { toast } from 'sonner';

interface CryptoNetworkFormDialogProps {
  data?: CryptoNetworkListData;
  open: boolean;
  title: string;
  onClose: () => void;
  yesLabel?: string;
}

const CryptoNetworkFormDialog: React.FC<CryptoNetworkFormDialogProps> = ({
  data,
  open,
  title,
  onClose,
  yesLabel = 'Create',
}) => {
  const parsedData = data && createCryptoNetworkSchema.parse(data);

  //i wrote this functio since some optional field may null
  function sanitizeData(obj: any) {
    const data = obj;
    Object.keys(data).forEach((key) => {
      // Check if the value is null
      if (obj[key] === true) {
        // Change the value to "true" if it's a boolean true
        data[key] = 'true';
      } else if (obj[key] === false) {
        // Change the value to "false" if it's a boolean false
        data[key] = 'false';
      }
    });
    return data;
  }

  const form = useForm<CreateCryptoNetworkForm>({
    resolver: zodResolver(createCryptoNetworkSchema),
    defaultValues: data && sanitizeData(parsedData),
  });

  const [createCryptoNetwork] = useCreateCryptoNetworkMutation();
  const [updateCryptoNetwork] = useUpdateCryptoNetworkMutation();

  const submit = async (submittedData: CreateCryptoNetworkForm) => {
    const dataToSend = {
      ...submittedData,
      requireMemo: submittedData.requireMemo === 'true',
    };
    if (data) {
      try {
        const response = await updateCryptoNetwork({
          id: data?.id,
          data: dataToSend,
        });
        if (response.data?.meta?.success) {
          toast.success(response.data?.meta.message);
          onClose();
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await createCryptoNetwork(dataToSend);
        if (response.data?.meta?.success) {
          toast.success(response.data?.meta.message);
          form.reset();
          onClose();
        } else {
          const error: any = response.error;
          toast.error(error?.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <Flex justify={'between'} align={'center'}>
          <DialogTitle> {title} </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Network" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requireMemo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Flex
                      align="center"
                      className="text-xs font-medium space-x-2"
                    >
                      <Checkbox
                        value={field.value === 'true' ? 'true' : 'false'}
                        onCheckedChange={(value) => {
                          field.onChange(value ? 'true' : 'false');
                        }}
                        defaultChecked={data && data.requireMemo}
                        id="check-box"
                        className="border-background"
                      />
                      <Label
                        htmlFor="check-box"
                        className="font-medium text-xs"
                      >
                        Require MEMO
                      </Label>
                    </Flex>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="link"
                type="button"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!form?.formState?.isValid}>
                {yesLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoNetworkFormDialog;
