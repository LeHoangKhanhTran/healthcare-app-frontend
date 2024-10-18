import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
const formatDate = (date: string) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const localDate = dayjs(date).local(); 
    const formattedDate = localDate.format('DD/MM/YYYY');
    return formattedDate;
}
export {formatDate}

