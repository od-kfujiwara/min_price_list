import React from 'react';

interface MonthTabsProps {
  months: { year: number; month: number }[];
  selectedMonthIndex: number;
  onMonthChange: (index: number) => void;
}

const MonthTabs: React.FC<MonthTabsProps> = ({ months, selectedMonthIndex, onMonthChange }) => {
  const getMonthLabel = (year: number, month: number) => {
    return `${year}年${month}月`;
  };

  return (
    <div className="month-tabs">
      {months.map((monthData, index) => (
        <button
          key={`${monthData.year}-${monthData.month}`}
          className={`tab ${selectedMonthIndex === index ? 'active' : ''}`}
          onClick={() => onMonthChange(index)}
        >
          {getMonthLabel(monthData.year, monthData.month)}
        </button>
      ))}
    </div>
  );
};

export default MonthTabs;