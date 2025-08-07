import { Box, Flex, Grid } from '@radix-ui/themes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import EditButton from './buttons/EditButton';

interface BotWrapperProps {
  title: string;
  subTitle: string;
  description: string;
  loading?: boolean;
  children?: React.ReactNode;
  form: any;
  submit: (data: any) => void;
  enableEditMode: boolean;
  setEnableEditMode: (value: boolean) => void;
  hideAccordion?: boolean;
  hideContent?: boolean;
  okBtn?: string;
  externalRender?: () => React.ReactNode | null;
}

export const BotWrapper: React.FC<BotWrapperProps> = ({
  title,
  subTitle,
  description,
  loading,
  children,
  form,
  submit,
  enableEditMode = false,
  setEnableEditMode,
  hideAccordion = false,
  hideContent = false,
  okBtn = 'Save',
  externalRender,
}) => {
  return (
    <Accordion
      type="single"
      className="w-full bg-white rounded-lg"
      collapsible
      defaultValue={hideAccordion ? 'item-1' : ''}
    >
      <AccordionItem
        value="item-1"
        className={hideAccordion ? 'divide-y-0' : 'divide-y'}
      >
        {hideAccordion ? <div /> : <AccordionTrigger>{title}</AccordionTrigger>}
        <AccordionContent>
          <Box className="space-y-2">
            <Form {...form}>
              <form
                className="flex flex-col gap-3"
                onSubmit={form.handleSubmit(submit)}
              >
                {!hideContent && (
                  <Flex
                    align={{
                      initial: 'start',
                      sm: 'center',
                    }}
                    justify={{
                      initial: 'start',
                      sm: 'between',
                    }}
                    direction={{
                      initial: 'column',
                      sm: 'row',
                    }}
                    className="gap-2"
                  >
                    <Box>
                      <div>{subTitle}</div>
                      <div>{description}</div>
                    </Box>
                    <Box>
                      {enableEditMode ? (
                        <Flex gap="3">
                          <Button
                            variant="outline"
                            type="button"
                            size="sm"
                            onClick={() => {
                              setEnableEditMode(false);
                              form.reset();
                            }}
                          >
                            Cancel
                          </Button>
                          <Button size="sm" type="submit" loading={loading}>
                            {okBtn}
                          </Button>
                        </Flex>
                      ) : (
                        <EditButton
                          variant="outline"
                          size="sm"
                          onClick={() => setEnableEditMode(true)}
                        />
                      )}
                    </Box>
                  </Flex>
                )}

                <Grid
                  columns={{
                    initial: '1',
                    sm: '2',
                    lg: '3',
                  }}
                  gap="3"
                >
                  {children}
                </Grid>
                {hideContent && (
                  <Box>
                    {enableEditMode ? (
                      <Flex
                        gap="3"
                        justify="end"
                        align="center"
                        className="flex-wrap"
                      >
                        {externalRender && externalRender()}
                        <Button
                          variant="outline"
                          type="button"
                          size="sm"
                          onClick={() => {
                            setEnableEditMode(false);
                            form.reset();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button size="sm" type="submit" loading={loading}>
                          {okBtn}
                        </Button>
                      </Flex>
                    ) : (
                      <Flex gap="3" justify="end" align="center">
                        {externalRender && externalRender()}
                      </Flex>
                    )}
                  </Box>
                )}
              </form>
            </Form>
          </Box>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
