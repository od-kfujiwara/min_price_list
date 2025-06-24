import React, { useState, useEffect } from 'react';
import { parseTSV, PriceData } from './utils/dataParser';
import LocationTabs from './components/LocationTabs';
import MonthTabs from './components/MonthTabs';
import Calendar from './components/Calendar';
import pricesData from './data/prices.tsv?raw';

const locations = ['東京', '大阪', '札幌', '福岡'];

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('東京');
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [months, setMonths] = useState<{ year: number; month: number }[]>([]);

  useEffect(() => {
    const data = parseTSV(pricesData);
    setPriceData(data);

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const nextMonths = [];
    for (let i = 0; i < 3; i++) {
      const monthDate = new Date(currentYear, currentMonth + i);
      nextMonths.push({
        year: monthDate.getFullYear(),
        month: monthDate.getMonth() + 1
      });
    }
    setMonths(nextMonths);
  }, []);

  return (
    <div className="app">
      <h1>ホテル最安値カレンダー</h1>
      
      <LocationTabs
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      
      <MonthTabs
        months={months}
        selectedMonthIndex={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      
      {months.length > 0 && (
        <Calendar
          year={months[selectedMonth].year}
          month={months[selectedMonth].month}
          location={selectedLocation}
          priceData={priceData}
        />
      )}
    </div>
  );
};

export default App;