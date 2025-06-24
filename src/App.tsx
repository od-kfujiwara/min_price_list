/**
 * ホテル最安値カレンダーアプリケーション
 * 
 * 4都市のホテル価格データを月別カレンダー形式で表示し、
 * 最安値の日付を視覚的に強調表示するReactアプリケーション
 */
import React, { useState, useEffect } from 'react';
import { parseTSV, PriceData } from './utils/dataParser';
import LocationTabs from './components/LocationTabs';
import MonthTabs from './components/MonthTabs';
import Calendar from './components/Calendar';
import pricesData from './data/prices.tsv?raw';

// 対応している都市一覧
const locations = ['東京', '大阪', '札幌', '福岡'];

const App: React.FC = () => {
  // 現在選択されている都市（デフォルト: 東京）
  const [selectedLocation, setSelectedLocation] = useState('東京');
  // 現在選択されている月のインデックス（0=今月, 1=来月, 2=再来月）
  const [selectedMonth, setSelectedMonth] = useState(0);
  // TSVファイルから読み込んだ全価格データ
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  // 表示対象の3ヶ月分の年月データ
  const [months, setMonths] = useState<{ year: number; month: number }[]>([]);

  useEffect(() => {
    // TSVファイルのデータをパースして状態に保存
    const data = parseTSV(pricesData);
    setPriceData(data);

    // 今月から3ヶ月分の年月データを生成
    const today = new Date();
    const currentMonth = today.getMonth(); // 0ベース（0=1月, 11=12月）
    const currentYear = today.getFullYear();
    
    const nextMonths = [];
    // 今月、来月、再来月の3ヶ月分を生成
    for (let i = 0; i < 3; i++) {
      const monthDate = new Date(currentYear, currentMonth + i);
      nextMonths.push({
        year: monthDate.getFullYear(),
        month: monthDate.getMonth() + 1 // 表示用に1ベースに変換
      });
    }
    setMonths(nextMonths);
  }, []);

  return (
    <div className="app">
      <h1>ホテル最安値カレンダー</h1>
      
      {/* 都市選択タブ */}
      <LocationTabs
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      
      {/* 月選択タブ */}
      <MonthTabs
        months={months}
        selectedMonthIndex={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      
      {/* 月データが読み込み完了後にカレンダーを表示 */}
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