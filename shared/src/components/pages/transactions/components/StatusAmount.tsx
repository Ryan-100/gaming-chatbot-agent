import React from 'react';
import { Text } from '@radix-ui/themes';
import { cn } from '../../../../utils/cn';

interface StatusAmountProps {
  status: string;
  title: string;
  amount?: string | number;
  rate?: string | TrustedHTML;
  crypto?: string | number;
}

const StatusAmount: React.FC<StatusAmountProps> = ({
  status,
  title,
  amount,
  rate,
  crypto,
}) => {
  const getStatusBg = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-surface-accentLight';
      case 'ACCEPTED':
        return 'bg-surface-success text-text-invert'; // Replace with your desired class
      case 'REJECTED':
        return 'bg-surface-error text-text-invert'; // Replace with your desired class
      default:
        return '';
    }
  };
  return (
    <div
      className={cn(
        'p-3 flex flex-col items-center justify-center rounded-sm font-semibold',
        getStatusBg(status)
      )}
    >
      <Text className="text-sm lg:text-lg text-inherit">{title}</Text>
      <Text className="text-xs lg:text-sm text-inherit">{crypto}</Text>
      {amount ? (
        <Text className="text-xs lg:text-sm text-inherit">{amount}</Text>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: rate ?? '' }}
          className="text-xs lg:text-sm text-inherit text-center"
        />
      )}
    </div>
  );
};

export default StatusAmount;
