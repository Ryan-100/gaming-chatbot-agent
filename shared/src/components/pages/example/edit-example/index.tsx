'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../ui/form';
import { Box, Section } from '@radix-ui/themes';
import { Input } from '../../../ui/input';
import Link from 'next/link';
import { Button } from '../../../ui/button';
import { MultiValue } from 'react-select';
import { IOptions } from '../../../../types/base.types';
import MultiSelect from '../../../ui/multi-select';

const validationSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required!' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  categories: z.any(),
});
type LoginRequest = z.infer<typeof validationSchema>;

const EditExample = () => {
  const form = useForm<LoginRequest>({
    resolver: zodResolver(validationSchema),
  });

  const submit = async (data: LoginRequest) => {
    console.log(data);
  };

  const options: IOptions[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <Box className="p-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 pt-6"
          onSubmit={form.handleSubmit(submit)}
        >
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <MultiSelect
                    data={options ?? []}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Your email here" />
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
                  <Input {...field} placeholder="Enter Your email here" />
                </FormControl>
              </FormItem>
            )}
          />

          <Link
            href={'/forget-pass'}
            className="text-right text-xs hover:underline"
          >
            Forget Password
          </Link>

          <Button type="submit" className="mt-4 w-full h-[50px]">
            Login
          </Button>
        </form>
      </Form>
    </Box>
  );
};

export default EditExample;
