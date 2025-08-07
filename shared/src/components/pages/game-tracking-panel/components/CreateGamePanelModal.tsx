import React from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Button } from '../../../ui/button';
import { Flex, Box, Grid } from '@radix-ui/themes';
import { Input } from '../../../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Icons } from '../../../ui/icons';
import {
  CreateTrackPanelForm,
  createTrackPanelSchema,
} from '../../../../types/track-panel.types';
import { useGetMainGameQuery } from '../../../../stores/reducers/main-games.reducer';
import { useCreateTrackPanelMutation } from '../../../../stores/reducers/track-panel.reducer';

const vpnOptions = [
  {
    label: 'Yes',
    value: 'true',
  },
  {
    label: 'No',
    value: 'false',
  },
];

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}
const CreateGamePanelModal = ({ open, handleClose }: ModalProps) => {
  const form = useForm<CreateTrackPanelForm>({
    resolver: zodResolver(createTrackPanelSchema),
    defaultValues: {
      main_game_id: 1,
      vpn_required: true,
    },
  });

  const { data: mainGameData, isSuccess: mainGameFetched } =
    useGetMainGameQuery({});

  const [createTrackPanel, { isLoading: formSubmitting }] =
    useCreateTrackPanelMutation();

  const resetForm = () => {
    form.reset({
      operator_name: '',
      url: '',
      user_name: '',
      password: '',
      main_game_id: 1,
      merchant_code: '',
      vpn_required: true,
    });
    handleClose();
  };

  const submit = async (data: CreateTrackPanelForm) => {
    try {
      const response = await createTrackPanel(data);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    resetForm();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="py-0 min-w-[270px] w-fit lg:w-[800px]">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle> Create Game Panel </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={resetForm}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Box>
          {mainGameFetched && (
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(submit)}
              >
                <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
                  <Box>
                    <FormField
                      control={form.control}
                      name="operator_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Operator Name </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter Operator Name"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Box>
                  <Box>
                    <FormField
                      control={form.control}
                      name="main_game_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Game</FormLabel>
                          <FormControl>
                            <Select
                              value={String(field.value)}
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {mainGameData &&
                                    mainGameData?.body?.data?.map(
                                      (item, index) => (
                                        <SelectItem
                                          value={String(item.id)}
                                          key={index}
                                        >
                                          {item.game_name}
                                        </SelectItem>
                                      )
                                    )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
                  <Box>
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter URL...." />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Box>
                  <Box>
                    <FormField
                      control={form.control}
                      name="merchant_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Merchant Code</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter the merchant code"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid
                  columns={{ initial: '1', md: '2' }}
                  className="gap-4 items-end"
                >
                  <Box>
                    <FormField
                      control={form.control}
                      name="user_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter the name of user"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Box>
                  <Box>
                    <FormField
                      control={form.control}
                      name="vpn_required"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VPN Requirement</FormLabel>
                          <FormControl>
                            <Select
                              value={String(field.value)}
                              onValueChange={(value) =>
                                field.onChange(value === 'true')
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {vpnOptions.map((item, index) => (
                                    <SelectItem value={item.value} key={index}>
                                      {item.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
                  <Box>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Create password" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Box>
                </Grid>

                <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
                  <Button variant={'outline'} type="button" onClick={resetForm}>
                    Cancel
                  </Button>

                  <Button type="submit" loading={formSubmitting}>
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGamePanelModal;
