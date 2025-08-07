import { Box, Flex, Grid } from '@radix-ui/themes';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

interface ContentWrapperProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  form: any;
  reset: () => void;
  submit: (data: any) => void;
  enableEditMode: boolean;
  setEnableEditMode: (value: boolean) => void;
  column?: string,
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  title,
  description,
  children,
  form,
  reset,
  submit,
  enableEditMode = false,
  setEnableEditMode,
  column,
}) => {
  return (
    <Card>
      <CardContent>
        <Box className="space-y-2 py-4">
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={form.handleSubmit(submit)}
            >
              <Flex align="center" justify="between">
                <Box>
                  <div>{title}</div>
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
                          reset();
                          setEnableEditMode(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button size="sm" type="submit">
                        Save
                      </Button>
                    </Flex>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEnableEditMode(true)}
                    >
                      Edit
                    </Button>
                  )}
                </Box>
              </Flex>

              <Grid columns={column ? column : "3"} gap="3">
                {children}
              </Grid>
            </form>
          </Form>
        </Box>
      </CardContent>
    </Card>
  );
};
