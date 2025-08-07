// utils/dayjs.ts

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs, { Dayjs } from 'dayjs';
import { TIME_ZONE } from '../lib/api';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault(TIME_ZONE);

const configuredTimeZone = (...args: Parameters<typeof dayjs>): Dayjs =>
  dayjs(...args).tz(TIME_ZONE);

export default configuredTimeZone;
