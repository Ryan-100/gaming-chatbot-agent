import React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Box, Flex } from '@radix-ui/themes';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import { HotGameListData } from '../../../../../types/hot-games.types';
import { useSortHotGameMutation } from '../../../../../stores/reducers/hot-games.reducer';

interface DialogProps {
  data: HotGameListData;
  open: boolean;
  handleClose: () => void;
}

// Define allowed image MIME types

const validationSchema = z.object({
  sorting: z.string(),
});

type SortHotGameForm = z.infer<typeof validationSchema>;

const SortHotGameDialog = ({ data, open, handleClose }: DialogProps) => {
  const form = useForm<SortHotGameForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      sorting: String(data?.sorting),
    },
  });

  const [sortHotGame, { isLoading: formSubmitting }] = useSortHotGameMutation();

  const resetForm = () => {
    form.reset({
      sorting: '',
    });
    handleClose();
  };

  const submit = async (submittedData: SortHotGameForm) => {
    const dataToSubmit = {
      hotId: String(data?.id),
      sorting: parseInt(submittedData?.sorting),
    };
    try {
      const response = await sortHotGame(dataToSubmit);
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
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px] py-0">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle> Sort Game </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={resetForm}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Box>
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={form.handleSubmit(submit)}
            >
              <Flex align={'center'} className="gap-2">
                <img
                  src={data?.childGames?.icon_en ?? ''}
                  alt={data?.childGames?.icon_en ?? ''}
                  width={70}
                  height={70}
                  className="w-[70px] h-[70px] rounded-lg object-cover"
                />
                <Flex direction={'column'} justify={'start'} className="gap-2">
                  <p className="text-xs">{data?.mainGames?.game_name ?? ''}</p>
                  <p className="text-sm">
                    {data?.childGames?.game_name_en ?? ''}
                  </p>
                </Flex>
              </Flex>
              <FormField
                control={form.control}
                name="sorting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort No. </FormLabel>
                    <FormControl className="w-full ">
                      <Input
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="Enter Sorting No."
                        id="sorting"
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4  w-full gap-2">
                <Button
                  variant={'outline'}
                  type="button"
                  onClick={resetForm}
                  className="min-w-[88px]"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  loading={formSubmitting}
                  className="min-w-[88px]"
                >
                  Sort
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SortHotGameDialog;
