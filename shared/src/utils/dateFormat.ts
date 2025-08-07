import dayjs from '../../../../../utils/dayjs';

export function dateFormat(date: string | Date) {
  return dayjs(date).format('YYYY-MM-DD');
}
