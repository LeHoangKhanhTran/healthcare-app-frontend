import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Shift, ShiftTime } from "./types";
const formatDate = (date: string) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const localDate = dayjs(date).local(); 
    const formattedDate = localDate.format('DD/MM/YYYY');
    return formattedDate;
}
export {formatDate}

const getWeekdayName = (weekday: number): string => {
    const weekdays = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    return weekdays[weekday];
};

export const parseShifts = (shifts: Shift[]) => {
    if (shifts) {
     const parsedShifts = shifts.reduce((acc, value) => {
         if (!acc[getWeekdayName(value.weekday)]) {
             acc[getWeekdayName(value.weekday)] = []
         }
         acc[getWeekdayName(value.weekday)].push({shiftId: value.shiftId, time: `${value.startTime}-${value.finishTime}`});
         return acc;
         }, {} as Record<string, ShiftTime[]>);
         return parsedShifts
    }
     return {};
 }

export const validateEmail = (value: string) => {
   const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w]{2,4}$/;
   if (emailRegex.test(value)) return true;
   return "Email không hợp lệ"
}  

export const validatePhoneNumber = (value: string) => {
  const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (phoneRegex.test(value)) return true;
  return "Số điện thoại không hợp lệ"
}

