'use client';
import { Box, Flex, Text } from '@radix-ui/themes';
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Input } from '../../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Switch } from '../../ui/switch';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { styles } from './components/mock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import { ConfirmationDialog } from '../../shared/dialog/ConfirmationDialog';
import { SuccessDialog } from '../../shared/dialog/SuccessDialog';
import { toast } from 'sonner';
import FormDialog from './components/FormDialog';
import { Image } from '../../ui/image';
import LanguageWrapper from '../../shared/LanguageWrapper';
import { cn } from '../../../utils/cn';
import { DatePicker } from '../../ui/date-picker';
import MonthPicker from '../../ui/month-picker';

const Example = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalTwoOpen, setSuccessModalTwoOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [monthDate, setMonthDate] = useState<Date | null>();

  console.log('monthDate', monthDate);

  return (
    <Box className="bg-gray-100 space-y-4 py-4">
      <h1>Hello World</h1>
      <Button>Home</Button>
      <Button size="sm">Home</Button>
      <Button size="lg">Home</Button>

      <Button variant="outline">Home</Button>
      <Button variant="link">Home</Button>
      <Button variant="destructive">Home</Button>
      <Button variant="secondary">Home</Button>
      <Button variant="success" size="sm">
        Home
      </Button>
      <Button variant="success" size="sm" className="bg-surface-link">
        Home
      </Button>
      <div className="grid grid-cols-12 gap-1">
        {styles.map((style) => (
          <Box className="text-xs">
            <Box className={cn('w-5 h-5 border', style.style)} />
            <Box>{style.name}</Box>
          </Box>
        ))}
      </div>
      <Box>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Support Info</TabsTrigger>
            <TabsTrigger value="password">Phone & Email</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </Box>
      <Box>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Box>
      <Box>
        <DatePicker />
      </Box>
      <Box className="w-[300px]">
        <MonthPicker date={monthDate} onChange={setMonthDate} />
      </Box>
      <Box className="w-1/3 min-w-[240px]">
        <LanguageWrapper
          language="မြန်မာ"
          icon={
            <Image
              src="/upload/icons/mm-icon.svg"
              alt="mm"
              width={20}
              height={20}
            />
          }
          element={
            <>
              <Text>Message</Text>
              {/* <TextEditor
                maxChar={200}
                defaultValue={content}
                setGetRteText={setContent}
              /> */}
            </>
          }
        />
      </Box>
      <Box>
        <Input />
      </Box>
      <Box>
        <Input className="bg-white rounded-full" />
      </Box>
      <Card>
        <CardHeader>
          <CardTitle>Card Example</CardTitle>
        </CardHeader>
        <CardContent>
          <h1>Card Detail</h1>
        </CardContent>
      </Card>
      <Flex className="space-x-3">
        <Switch />
        <h6>Switch</h6>
      </Flex>
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>
      {/* <Box>
        <DataTable
          data={data}
          columns={appsColumnDef}
          query={query}
          onChange={handlePageChange}
        />
      </Box> */}
      <Box>
        <Avatar>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Box>
      <Box>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="bg-white">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box>
        <Button onClick={() => setConfirmModalOpen(true)}>Dialog Open</Button>
        <ConfirmationDialog
          open={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          title="Are you sure do you want to delete?"
          message="This action cannot be undone. This will permanently delete the site and remove all the data related with the site from our servers."
          yesLabel="Confirm"
          noLabel="Cancel"
          onSubmit={() => {
            console.log('');
          }}
        />
      </Box>

      <Box>
        <Button onClick={() => setSuccessModalOpen(true)}>
          Success Dialog Open
        </Button>
        <SuccessDialog
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          title="Noti Details"
        >
          <h1>
            This action cannot be undone. This will permanently delete the site
            and remove all the data related with the site from our servers.
          </h1>
        </SuccessDialog>
      </Box>
      <Box>
        <Button onClick={() => setSuccessModalTwoOpen(true)}>
          Success Dialog Two Open
        </Button>
        <SuccessDialog
          open={successModalTwoOpen}
          onClose={() => setSuccessModalTwoOpen(false)}
          title="Noti Details"
          yesLabel="Confirm"
        >
          <Box>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Box>
        </SuccessDialog>
      </Box>
      <Box>
        <Button onClick={() => setFormModalOpen(true)}>Form Dialog Open</Button>
        <FormDialog
          open={formModalOpen}
          onClose={() => setFormModalOpen(false)}
        />
      </Box>
      <Box>
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            })
          }
        >
          Show Toast
        </Button>
      </Box>
    </Box>
  );
};

export default Example;
