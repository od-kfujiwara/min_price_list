import React from 'react';
import { PriceData, filterByLocation, filterByMonth, getMinPriceForMonth } from '../utils/dataParser';
import PriceCell from './PriceCell';

/**
 * 月別カレンダーコンポーネントのプロパティ
 */
interface CalendarProps {
  /** 表示年 */
  year: number;
  /** 表示月（1-12） */
  month: number;
  /** 表示対象の都市 */
  location: string;
  /** 全価格データ */
  priceData: PriceData[];
}

const Calendar: React.FC<CalendarProps> = ({ year, month, location, priceData }) => {
  /**
   * 指定した年月の日数を取得
   * @param year - 年
   * @param month - 月（1-12）
   * @returns その月の日数
   */
  const getDaysInMonth = (year: number, month: number) => {
    // new Date(year, month, 0)で前月の最終日を取得
    return new Date(year, month, 0).getDate();
  };

  /**
   * 指定した年月の1日が何曜日かを取得
   * @param year - 年
   * @param month - 月（1-12）
   * @returns 曜日（0=日曜, 6=土曜）
   */
  const getFirstDayOfMonth = (year: number, month: number) => {
    // month-1でJavaScriptの0ベース月に変換
    return new Date(year, month - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, month); // その月の日数
  const firstDay = getFirstDayOfMonth(year, month); // 月初の曜日
  const today = new Date(); // 今日（過去日判定用）
  
  // 指定した都市と年月のデータのみをフィルタリング
  const filteredData = filterByMonth(filterByLocation(priceData, location), year, month);
  const minPrice = getMinPriceForMonth(filteredData); // その月の最安値
  
  /**
   * 指定した日付の価格データを取得
   * @param day - 日（1-31）
   * @returns その日の価格データ、なければundefined
   */
  const getPriceForDate = (day: number): PriceData | undefined => {
    // YYYY-MM-DD形式の日付文字列を作成
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredData.find(item => item.date === dateStr);
  };

  /**
   * 指定した日付が過去かどうかを判定
   * @param day - 日（1-31）
   * @returns 過去の日付の場合true
   */
  const isDatePast = (day: number) => {
    const cellDate = new Date(year, month - 1, day);
    // 今日より前で、かつ今日ではない場合に過去と判定
    return cellDate < today && cellDate.toDateString() !== today.toDateString();
  };

  // 曜日表示用の配列
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  /**
   * カレンダーの全セルをレンダリング
   * 曜日ヘッダー、空セル、日付セルを含む
   * @returns レンダリングするJSX要素の配列
   */
  const renderCalendarCells = () => {
    const cells = [];
    
    // 1. 曜日ヘッダーを追加
    for (let i = 0; i < weekDays.length; i++) {
      cells.push(
        <div key={`weekday-${i}`} className="calendar-weekday">
          {weekDays[i]}
        </div>
      );
    }

    // 2. 月初までの空セルを追加（例: 1日が水曜なら日月火の3セルが空）
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    // 3. 実際の日付セルを追加
    for (let day = 1; day <= daysInMonth; day++) {
      const priceInfo = getPriceForDate(day); // その日の価格情報
      const isPast = isDatePast(day); // 過去の日付か
      
      cells.push(
        <PriceCell
          key={`day-${day}`}
          day={day}
          price={priceInfo?.price}
          hotel={priceInfo?.hotel}
          isPast={isPast}
          isMinPrice={priceInfo?.price === minPrice && minPrice > 0} // 最安値且つ有効なデータがある場合
          minPriceOfMonth={minPrice}
        />
      );
    }

    return cells;
  };

  return (
    <div className="calendar-container">
      {/* CSS Gridで曜日ヘッダー + 日付セルを配置 */}
      <div className="calendar">
        {renderCalendarCells()}
      </div>
    </div>
  );
};

export default Calendar;