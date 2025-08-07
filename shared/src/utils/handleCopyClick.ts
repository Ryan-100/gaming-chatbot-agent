import { toast } from 'sonner';

export const handleCopyClick = (textToCopy: string) => {
  navigator.clipboard.writeText(textToCopy).then(() =>
    toast.success('Copied to clipboard successfully')
  );
};
