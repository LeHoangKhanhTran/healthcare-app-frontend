import * as React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use Moment.js, DateFns, etc.
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { DateView } from '@mui/x-date-pickers';
const CustomDateCalendar = styled(DateCalendar)`
  && {
    
    background-color: var(--dialogue-bg-color); /* Background color of the calendar */
    border-radius: 10px;
    padding: 10px;
    /* Set a fixed width and height to prevent overflow */
    width: 100%; /* Ensure it fits the parent container */
    max-width: 320px; /* Maximum width to prevent horizontal overflow */
    max-height: 320px;
     /* Fixed height to control vertical space */
    overflow: hidden; /* Hide overflowing content */
    overflow-y: auto; /* Enable scrolling if vertical content exceeds */
    z-index: 10;
    div {
        font-family: "Plus Jakarta Sans", sans-serif;
        color: white;

    }

    svg, span {
      font-family: "Plus Jakarta Sans", sans-serif;
      color: var(--green);
      font-weight: 700;
    }

    .MuiPickersFadeTransitionGroup-root  {
      overflow: hidden;
    }
    
    .Mui-disabled {
    color: gray !important; 
    opacity: 0.7; 
  }
    .MuiPickersDay-root {
      font-weight: bold;
      color: var(--white-text-color); 
      &:hover {
        background-color: var(--blue); 
        color: white;
      }
      &.Mui-selected {
        background-color: var(--green); 
        color: white; 
      }
    }

    .MuiPickersCalendarHeader-root {
      color: white;
      position: sticky;
      top: 0;
      z-index: 1;
      height: 320px; 
    }

    .MuiPickersFadeTransitionGroup-root {
      color: #000; 
    }
  }
`;

export default function DatePicker({ handler, weekdays=[] } : {handler: (value?: any) => void, weekdays?: number[]}) {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [currentView, setCurrentView] = React.useState('day');
  const handleViewChange = (newView: DateView) => {
    setCurrentView(newView); 
  };
  
  const handleDateChange = (newDate: Dayjs) => {
    if (currentView == 'day') {
       setSelectedDate(newDate);
       handler(newDate)
    }
 
  };

  const shouldDisabled = (date: Dayjs) => {
    let day = date.day();
    return weekdays.length > 0 && !weekdays.includes(day)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <CustomDateCalendar 
      value={selectedDate} 
      onChange={handleDateChange} 
      shouldDisableDate={shouldDisabled}
      onViewChange={handleViewChange}
      minDate={dayjs()}
      className='calendar' 
      />
    </LocalizationProvider>
  );
}
