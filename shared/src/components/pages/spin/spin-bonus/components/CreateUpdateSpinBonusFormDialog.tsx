import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import { Box } from '@radix-ui/themes';
import { Input } from '../../../../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  SpinBonusListData,
  createSpinBonusSchema,
  CreateSpinBonusForm,
} from '../../../../../types/spin-bonus.types';
import {
  useCreateSpinBonusMutation,
  useUpdateSpinBonusMutation,
} from '../../../../../stores/reducers/spin-bonus.reducer';
import { toast } from 'sonner';
import { Flex } from '@radix-ui/themes';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  yesLabel?: string;
  data?: SpinBonusListData;
}

const CreateUpdateSpinBonusModal: React.FC<ModalProps> = ({
  data,
  open,
  onClose,
  title,
  yesLabel,
}) => {
  const form = useForm<CreateSpinBonusForm>({
    resolver: zodResolver(createSpinBonusSchema),
    defaultValues: data && createSpinBonusSchema.parse(data),
  });

  const [createSpinBonus] = useCreateSpinBonusMutation();
  const [updateSpinBonus] = useUpdateSpinBonusMutation();

  const submit = async (submittedData: CreateSpinBonusForm) => {
    const dataToSend = {
      ...submittedData,
    }; // nothing to transform but i wrote this to be consistent

    if (data) {
      try {
        const response = await updateSpinBonus({
          id: data?.id,
          data: dataToSend,
        });
        if (response.data?.meta?.success) {
          toast('Successfully updated Spin Bonus');
          onClose()
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await createSpinBonus(dataToSend);
        if (response.data?.meta?.success) {
          toast('Successfully created Spin Bonus');
          form.reset();
          onClose();
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>{title}</DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>

        <Box>
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={form.handleSubmit(submit)}
            >
              <FormField
                control={form.control}
                name="spinCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Spin Count </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        type="number"
                        placeholder="Enter Spin Count"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Amount </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        type="number"
                        placeholder="Enter Amount"
                      />
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
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateSpinBonusModal;
