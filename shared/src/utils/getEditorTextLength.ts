import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';

// Function to get the plain text content length from HTML
export const getTextContentLength = (htmlString: any) => {
  // Convert HTML to DraftJS ContentState
  const contentBlock = htmlToDraft(htmlString);

  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
      contentBlock.entityMap
    );
    const editorState = EditorState.createWithContent(contentState);

    // Convert the content to plain text
    const plainText = editorState.getCurrentContent().getPlainText('');

    // Return the length of the plain text
    return plainText.length;
  }
  return 0;
};
