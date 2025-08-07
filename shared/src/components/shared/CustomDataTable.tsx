import React from 'react';
import { Box } from '@radix-ui/themes';
import { Image } from '../ui/image';

interface TableProps {
  tableHeaderData: string[];
  tableBodyData: Record<string, string | number | JSX.Element>[];
}

export const CustomDataTable: React.FC<TableProps> = ({
  tableHeaderData,
  tableBodyData,
}) => {
  return (
    <Box className="w-full h-full relative px-4 py-2">
      <table className="w-full">
        <tr className="border-b border-neutral-400 h-fit last:border-none">
          {tableHeaderData.map((header) => (
            <th key={header} className="text-left py-3">
              {header}
            </th>
          ))}
        </tr>
        {tableBodyData?.length > 0 ? (
          tableBodyData.map((row, index) => (
            <tr
              key={index}
              className="border-b border-neutral-400 last:border-none"
            >
              {Object.values(row).map((value, idx) => (
                <td key={idx} className="py-3">
                  {typeof value === 'string' || typeof value === 'number'
                    ? value
                    : value}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/upload/icons/planet-icon.png"
              alt="No-Data"
              width={96}
              height={96}
            />
          </Box>
        )}
      </table>
    </Box>
  );
};
