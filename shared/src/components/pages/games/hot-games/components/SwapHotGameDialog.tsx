import React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Flex, Box } from '@radix-ui/themes';
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
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Label } from '../../../../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import { Icons } from '../../../../ui/icons';
import Loading from '../../../../ui/loading';
import { useGetMainGameQuery } from '../../../../../stores/reducers/main-games.reducer';
import { useSwapHotGameMutation } from '../../../../../stores/reducers/hot-games.reducer';
import { useGetChildGameByMainQuery } from '../../../../../stores/reducers/child-games.reducer';
import { ChildGameListData } from '../../../../../types/child-games.types';
import { HotGameListData } from '../../../../../types/hot-games.types';

interface ModalProps {
  data: HotGameListData;
  open: boolean;
  handleClose: () => void;
}

const validationSchema = z.object({
  main_game_id: z.string(),
  newChildGameId: z.string().optional(),
});

type SwapHotGameForm = z.infer<typeof validationSchema>;

const SwapHotGameDialog = ({ data, open, handleClose }: ModalProps) => {
  console.log('data', data);

  const [childGameFilter, setChildGameFilter] = React.useState<string>('');
  const [selectedId, setSelectedId] = React.useState<number>(
    data?.mainGames.id
  );
  const [selectedChildGame, setSelectedChildGame] = React.useState<number>(
    data?.childGames?.id ?? 0
  );
  const [selectedChildGameList, setSelectedChildGameList] =
    React.useState<ChildGameListData[]>();

  const form = useForm<SwapHotGameForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      main_game_id: String(data?.main_game_id),
      newChildGameId: String(data?.childGames?.id),
    },
  });

  const { data: mainGameData, isSuccess: mainGameFetched } =
    useGetMainGameQuery({ status: 'active' });

  const { data: childGamesByMain, isSuccess: childGamesFetched } =
    useGetChildGameByMainQuery({
      main_game_id: selectedId,
      pageIndex: 1,
      rowPerPage: 500,
    });

  const [swapHotGame, { isLoading: formSubmitting }] = useSwapHotGameMutation();

  React.useEffect(() => {
    setSelectedChildGameList(childGamesByMain?.body?.data ?? []);
  }, [childGamesByMain, childGamesFetched]);

  const resetForm = () => {
    form.reset({
      newChildGameId: '',
    });
    handleClose();
  };

  const submit = async (submittedData: SwapHotGameForm) => {
    const dataToSubmit = {
      oldChildGameId: String(data?.childGames?.id) ?? '',
      newChildGameId: submittedData?.newChildGameId ?? '',
    };
    try {
      const response = await swapHotGame(dataToSubmit);
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
          <DialogTitle> Swap Game </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={resetForm}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Box>
          {mainGameFetched ? (
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(submit)}
              >
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
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedId(parseInt(value));
                            }}
                            disabled
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Main Game">
                                {mainGameData.body?.data.find(
                                  (item) => item.id === data?.mainGames.id
                                )?.game_name ?? ''}
                              </SelectValue>
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
                <Box>
                  <FormItem>
                    <FormLabel>Search Child Game</FormLabel>
                    <FormControl>
                      <Input
                        value={childGameFilter}
                        onChange={(e) => {
                          setChildGameFilter(e.target.value);
                          setSelectedChildGameList(
                            childGamesByMain?.body?.data?.filter((game) =>
                              game.game_name_en
                                .toLowerCase()
                                .includes(e.target.value.toLowerCase())
                            )
                          );
                        }}
                        placeholder="Search by game"
                        preFix={<Icons.Search />}
                      />
                    </FormControl>
                  </FormItem>
                  {form?.formState?.errors?.newChildGameId && (
                    <div className="text-xs text-red-600 flex items-center mt-1">
                      <div className="me-1">
                        <Icons.Error />
                      </div>
                      <p className="text-text-error text-xs font-semibold">
                        Please choose one of the child games
                      </p>
                    </div>
                  )}
                </Box>
                <RadioGroup
                  className="flex flex-col gap-2 items-start"
                  value={String(selectedChildGame)}
                  onValueChange={(value) => {
                    setSelectedChildGame(parseInt(value));
                    form.setValue('newChildGameId', value);
                  }}
                >
                  {childGamesByMain?.body
                    ? selectedChildGameList?.map((game, index) => (
                        <Flex className="w-full items-center gap-2" key={index}>
                          <RadioGroupItem
                            value={String(game.id)}
                            id={String(game.id)}
                          />
                          <Label
                            className="text-xs flex items-center gap-2"
                            htmlFor={String(game.id)}
                          >
                            <img
                              src={game?.icon_en ?? ''}
                              alt={game.game_name_en}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                            <p>{game.game_name_en}</p>
                          </Label>
                        </Flex>
                      ))
                    : null}
                </RadioGroup>

                <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full gap-2">
                  <Button variant={'outline'} type="button" onClick={resetForm}>
                    Cancel
                  </Button>

                  <Button type="submit" loading={formSubmitting}>
                    Swap
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          ) : (
            <Loading />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SwapHotGameDialog;
