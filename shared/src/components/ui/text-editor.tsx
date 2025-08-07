import React from 'react';
import { Box } from '@radix-ui/themes';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toast } from 'sonner';

interface TextEditorProps {
  maxChar?: number;
  defaultValue: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TextEditor: React.FC<TextEditorProps> = ({
  maxChar,
  defaultValue,
  setValue,
}) => {
  const editorRef = React.useRef<Editor>(null);
  const [editorState, setEditorState] = React.useState<EditorState>(() => {
    if (defaultValue) {
      const contentBlock = htmlToDraft(defaultValue);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
          contentBlock.entityMap
        );
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty();
  });

  const [textLength, setTextLength] = React.useState(0);

  React.useEffect(() => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setValue(html);
  }, [editorState]);

  React.useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current?.focusEditor();
      }, 0);
    }
  }, []);

  const handlePastedText = (pastedText: string) => {
    const currentContent = editorState.getCurrentContent();
    const currentLength = currentContent.getPlainText('').length;

    if (maxChar && currentLength + pastedText.length > maxChar) {
      toast.error('Your copied text is exceeding the maximum character!');
      return true; // Prevent pasting text that exceeds the limit
    }
    return false;
  };

  const onEditorStateChange = (newEditorState: EditorState) => {
    const text = newEditorState.getCurrentContent().getPlainText('').length;
    if (maxChar && text > maxChar) {
      toast.error('Your text is exceeding the maximum character!');
    }
    setEditorState(newEditorState);
    setTextLength(text);
  };

  const toolbarOptions = {
    options: ['inline'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough'],
      bold: { className: '!bg-transparent !border-0 custom-bold-button' },
      italic: { className: '!bg-transparent !border-0 custom-italic-button' },
      underline: {
        className: '!bg-transparent !border-0 custom-underline-button',
      },
      strikethrough: {
        className: '!bg-transparent !border-0 custom-strikethrough-button',
      },
    },
  };

  return (
    <Box className="relative text-xs space-y-1">
      <Editor
        ref={editorRef}
        editorState={editorState}
        toolbarClassName="!bg-white !rounded-tl-lg !rounded-tr-lg !border-t-0 !border-l-0 !border-r-0 !border-b !border-b-border-secondary"
        wrapperClassName="bg-surface-secondary border border-border-secondary rounded-lg h-fit"
        editorClassName="px-4"
        handlePastedText={handlePastedText}
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbarOptions}
      />
      {maxChar && (
        <Box className="text-right text-xs">
          {textLength}/{maxChar}
        </Box>
      )}
    </Box>
  );
};

export default TextEditor;
