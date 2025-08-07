import React from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Box } from '@radix-ui/themes';
import { Dialog, DialogContent, DialogTitle } from '../../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import { Label } from '../../../../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../../../../ui/radio-group';
import { Input } from '../../../../../ui/input';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import { MainGameDetailData } from '../../../../../../types/main-games.types';
import { useUpdateMainGameMutation } from '../../../../../../stores/reducers/main-games.reducer';

interface ModalProps {
  data: MainGameDetailData;
  open: boolean;
  handleClose: () => void;
}

const validationSchema = z.object({
  sorting: z.number().min(1, { message: 'Sorting is required!' }),
  is_active: z.union([z.string(), z.boolean()], {
    message: 'Chose one for active status',
  }),
  has_child: z.union([z.string(), z.boolean()], {
    message: 'Are there any child game?',
  }),
});

type InformationType = z.infer<typeof validationSchema>;

const InformationEditModal = ({ data, open, handleClose }: ModalProps) => {
  const form = useForm<InformationType>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      sorting: data?.sorting,
      is_active: data?.is_active,
      has_child: data?.has_child,
    },
  });

  const [updateMainGame, { isLoading: formSubmitting }] =
    useUpdateMainGameMutation();

  const submit = async (submittedData: any) => {
    const dataToSend = {
      ...submittedData,
      id: data?.id,
      mainGameLanguages: data?.mainGameLanguages,
    };
    try {
      const response = await updateMainGame({ data: dataToSend });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Edit Basic Information </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={handleClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Box>
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={form.handleSubmit(submit)}
            >
              <FormItem>
                <FormLabel> Game ID </FormLabel>
                <FormControl>
                  <Input value={data?.id} disabled />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel> Code </FormLabel>
                <FormControl>
                  <Input value={data?.gameType[0]?.code} disabled />
                </FormControl>
              </FormItem>

              <FormField
                control={form.control}
                name="sorting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Sort No. </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        placeholder="Enter sorting no."
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex items-center justify-between"
                        value={String(field.value)}
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                      >
                        <Box className="w-1/2 flex items-center space-x-2">
                          <RadioGroupItem value="true" id="Yes" />
                          <Label className="text-xs" htmlFor="Yes">
                            Yes
                          </Label>
                        </Box>
                        <Box className="w-1/2 flex items-center space-x-2">
                          <RadioGroupItem value="false" id="No" />
                          <Label className="text-xs" htmlFor="No">
                            No
                          </Label>
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="has_child"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Has Child?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex items-center justify-between"
                        value={String(field.value)}
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                        disabled={true}
                      >
                        <Box className="w-1/2 flex items-center space-x-2">
                          <RadioGroupItem
                            value="true"
                            id="Yes"
                            disabled={true}
                          />
                          <Label className="text-xs" htmlFor="Yes">
                            Yes
                          </Label>
                        </Box>
                        <Box className="w-1/2 flex items-center space-x-2">
                          <RadioGroupItem
                            value="false"
                            id="No"
                            disabled={true}
                          />
                          <Label className="text-xs" htmlFor="No">
                            No
                          </Label>
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Flex justify={'end'} align={'center'} className="gap-x-4 pt-4">
                <Button variant={'outline'} onClick={handleClose} type="button">
                  Cancel
                </Button>

                <Button color="primary" type="submit" loading={formSubmitting}>
                  Update
                </Button>
              </Flex>
            </form>
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InformationEditModal;
