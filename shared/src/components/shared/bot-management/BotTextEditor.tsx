import { Box } from '@radix-ui/themes';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../../ui/text-editor'), {
  ssr: false,
});

interface BotTextEditorProps {
  editMode?: boolean;
  maxChar?: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const BotTextEditor: React.FC<BotTextEditorProps> = ({
  editMode = false,
  maxChar,
  value,
  setValue,
}) => {
  return (
    <Box className="">
      {!editMode ? (
        <Box
          className="bg-surface-secondary p-4 rounded-lg text-[12px]"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <TextEditor
          defaultValue={value}
          setValue={setValue}
          maxChar={maxChar}
        />
      )}
    </Box>
  );
};
