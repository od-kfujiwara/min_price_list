import React from 'react';
import { PriceData, filterByLocation, filterByMonth, getMinPriceForMonth } from '../utils/dataParser';
import PriceCell from './PriceCell';

interface CalendarProps {
  year: number;
  month: number;
  location: string;
  priceData: PriceData[];
}

const Calendar: React.FC<CalendarProps> = ({ year, month, location, priceData }) => {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  
  const filteredData = filterByMonth(filterByLocation(priceData, location), year, month);
  const minPrice = getMinPriceForMonth(filteredData);
  
  const getPriceForDate = (day: number): PriceData | undefined => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredData.find(item => item.date === dateStr);
  };

  const isDatePast = (day: number) => {
    const cellDate = new Date(year, month - 1, day);
    return cellDate < today && cellDate.toDateString() !== today.toDateString();
  };

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  const renderCalendarCells = () => {
    const cells = [];
    
    for (let i = 0; i < weekDays.length; i++) {
      cells.push(
        <div key={`weekday-${i}`} className="calendar-weekday">
          {weekDays[i]}
        </div>
      );
    }

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const priceInfo = getPriceForDate(day);
      const isPast = isDatePast(day);
      
      cells.push(
        <PriceCell
          key={`day-${day}`}
          day={day}
          price={priceInfo?.price}
          hotel={priceInfo?.hotel}
          isPast={isPast}
          isMinPrice={priceInfo?.price === minPrice && minPrice > 0}
          minPriceOfMonth={minPrice}
        />
      );
    }

    return cells;
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        {renderCalendarCells()}
      </div>
    </div>
  );
};

export default Calendar;