// utils/getFileType.ts

type FileType = 'image' | 'document' | 'video' | 'audio' | 'unknown';

export const getFileType = (fileName: string): FileType => {
  const extension = fileName?.split('.').pop()?.toLowerCase();

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  const documentExtensions = [
    'pdf',
    'doc',
    'docx',
    'txt',
    'odt',
    'xls',
    'xlsx',
    'csv',
  ];
  const videoExtensions = ['mp4', 'mov', 'wmv', 'avi', 'mkv'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a'];

  if (!extension) {
    return 'unknown';
  }

  if (imageExtensions.includes(extension)) {
    return 'image';
  }
  if (documentExtensions.includes(extension)) {
    return 'document';
  }
  if (videoExtensions.includes(extension)) {
    return 'video';
  }
  if (audioExtensions.includes(extension)) {
    return 'audio';
  }

  return 'unknown';
};

export const getStatus = (content: string): string => {
  const extension = content.toLowerCase();
  if (!extension) {
    return 'message';
  }

  if (content === 'image') {
    return 'image';
  }
  if (content === 'document') {
    return 'document';
  }
  if (content === 'video') {
    return 'video';
  }
  if (content === 'audio') {
    return 'audio';
  }
  return 'message';
};

export const getAttachmentType = (type: string) => {
  if (type === 'image' || type === 'video') {
    return 'MEDIA';
  } else {
    return 'FILE';
  }
};
