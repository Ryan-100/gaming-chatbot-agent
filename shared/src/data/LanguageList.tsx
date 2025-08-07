export interface Language {
  id: number;
  label: string;
  image: string;
}

export const languageData: Language[] = [
  {
    id: 1,
    label: 'English',
    image: '/upload/images/eng_icon.png',
  },
  {
    id: 3,
    label: 'Chinese',
    image: '/upload/images/china_icon.png',
  },
  {
    id: 2,
    label: 'Myanmar',
    image: '/upload/images/mm_icon.png',
  },
];
