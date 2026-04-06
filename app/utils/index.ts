import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const myDateFmt = (val: string | Date, fmt?: string): string => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return dayjs(val).tz('Asia/Tokyo').format(fmt ?? 'YYYY年MM月DD日');
}