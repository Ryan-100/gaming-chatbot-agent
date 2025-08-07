import { Flex, Text } from '@radix-ui/themes';
import { cn } from '../../utils/cn';
import { Icons } from '../ui/icons';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { Card, CardContent } from '../ui/card';
import React from 'react';
import { toast } from 'sonner';

export interface RowProps {
  key: string | JSX.Element;
  value: string | number | JSX.Element | React.ReactNode;
  enableCopy?: boolean | JSX.Element;
}

export interface PropertiesTableProps {
  rows: RowProps[];
  className?: string;
}

export default function PropsTable(props: PropertiesTableProps) {
  const { rows, className } = props;

  const handleCopy = (text: string) => {
    console.log(text, 'text to copy');
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Text copied'));
  };

  return (
    <Card>
      <CardContent className="pt-2 px-2 min-w-[200px]">
        <Table className={cn(className)}>
          <TableBody>
            {rows.map(({ key, value, enableCopy }, index) => (
              <TableRow
                key={index}
                className=" border-b border-b-surface-secondary flex items-start"
              >
                <TableCell className="text-sm font-semibold pr-4" width="50%">
                  {key}
                </TableCell>
                <TableCell className="text-sm flex justify-center items-center w-[50%] md:w-[60%]">
                  <Text className="w-full">{value}</Text>
                  {enableCopy && (
                    <button onClick={() => handleCopy(String(value))}>
                      <Icons.Copy className="text-primary ml-1" />
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
