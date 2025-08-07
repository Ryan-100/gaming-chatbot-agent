import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '../../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import { Input } from '../../../../../ui/input';
import { Flex, Box } from '@radix-ui/themes';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../../ui/button';
import { Icons } from '../../../../../ui/icons';
import { ChildGameDetailData } from '../../../../../../types/child-games.types';

interface ModalProps {
  data: ChildGameDetailData;
  open: boolean;
  handleClose: () => void;
}

const validationSchema = z.object({
  gameId: z.string().min(1, { message: 'Game Id is required!' }),
  code: z.string().min(1, { message: 'Code is required!' }),
  mainGame: z.string().min(1, { message: 'Code is required!' }),
  gameType: z.string().min(1, { message: 'Code is required!' }),
});

type InformationType = z.infer<typeof validationSchema>;

const InformationEditModal = ({ data, open, handleClose }: ModalProps) => {
  const form = useForm<InformationType>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      gameId: data?.g_code,
      mainGame: data?.mainGames?.game_name,
      gameType: data?.gameType?.name,
      code: data?.gameType?.code,
    },
  });

  const submit = (data: any) => {
    console.log(data);
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
              <FormField
                control={form.control}
                name="gameId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Game ID </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Game ID" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Code </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter code" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mainGame"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Main Game </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Main Game Name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gameType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Game Type </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Game Type" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Flex justify={'end'} align={'center'} className="gap-x-4">
                <Button variant={'outline'} onClick={handleClose} type="button">
                  Cancel
                </Button>

                <Button color="primary" type="submit">
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
