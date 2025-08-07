'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Image } from '../../ui/image';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Checkbox } from '../../ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../ui/form';
import { Label } from '../../ui/label';
import { LoginForm, loginSchema } from '../../../types/auth.types';
import { useLoginMutation } from '../../../stores/reducers/auth.reducer';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { setToken } from '../../../utils/auth';

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [loginAction, { isLoading }] = useLoginMutation();

  const submit = async (data: LoginForm) => {
    try {
      const response = await loginAction(data);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        setToken(response.data?.body?.data.accessToken ?? '');
        router.replace('/routes-change');
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex
      align="center"
      justify="center"
      className="relative w-full h-screen bg-[url('/upload/images/login-bg.png')] bg-no-repeat bg-cover bg-center"
    >
      <Box className="absolute inset-0 w-full h-full bg-background/50 z-0" />
      <Flex
        direction="column"
        className="scale-75 xl:scale-100 gap-y-16 items-center justify-center z-10"
      >
        <Image
          src="/upload/images/login-logo.png"
          alt="Logo"
          width={264}
          height={154}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <Card className="py-6 px-8 space-y-6 max-w-[424px]">
              <Flex direction="column" className="space-y-4">
                <Text className="text-2xl font-bold">Log In</Text>
                <Text className="text-secondary text-base">
                  Welcome back! Please log into your account to manage.
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Login ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className=""
                          placeholder="Enter your login ID"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className=""
                          placeholder="Enter your password"
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Flex>
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem onChange={field.onChange}>
                    <FormControl>
                      <Flex
                        align="center"
                        className="text-xs font-medium space-x-2"
                      >
                        <Checkbox
                          id="check-box"
                          className="border border-foreground"
                        />
                        <Label
                          htmlFor="check-box"
                          className="font-medium text-xs"
                        >
                          Remember me
                        </Label>
                      </Flex>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button size="lg" loading={isLoading}>
                Log in
              </Button>
            </Card>
          </form>
        </Form>
      </Flex>
    </Flex>
  );
};

export default Login;
