import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '../../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import { Input } from '../../../../../ui/input';
import { Flex, Box } from '@radix-ui/themes';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../../ui/button';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const validationSchema = z.object({
  gameId: z.string().min(1, { message: 'Game Id is required!' }),
  code: z.string().min(1, { message: 'Code is required!' }),
  childGame: z.enum(['Yes', 'No'], { message: 'Selection must be Yes or No' }),
});

const childGameOptions = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
];

type InformationType = z.infer<typeof validationSchema>;

const InformationEditModal = ({ open, handleClose }: ModalProps) => {
  const form = useForm<InformationType>({
    resolver: zodResolver(validationSchema),
  });

  const submit = (data: any) => {
    console.log(data);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle> Basic Information </DialogTitle>
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
                name="childGame"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child Game</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {childGameOptions.map((item, index) => (
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

              <Flex justify={'end'} align={'center'} className="gap-x-4 pt-4">
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
