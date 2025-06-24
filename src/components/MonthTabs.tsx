/**
 * 月選択タブコンポーネント
 * ユーザーが表示したい月を選択できるタブUIを提供。
 * 現在月、来月、再来月の3ヶ月分を表示。
 */
import React from 'react';

/**
 * MonthTabsコンポーネントのプロパティ
 */
interface MonthTabsProps {
  /** 表示する月のデータ配列（通常3ヶ月分） */
  months: { year: number; month: number }[];
  /** 現在選択されている月のインデックス */
  selectedMonthIndex: number;
  /** 月変更時のコールバック関数 */
  onMonthChange: (index: number) => void;
}

const MonthTabs: React.FC<MonthTabsProps> = ({ months, selectedMonthIndex, onMonthChange }) => {
  /**
   * 年月を日本語形式で表示するラベルを生成
   * @param year - 年
   * @param month - 月
   * @returns "YYYY年M月"形式の文字列
   */
  const getMonthLabel = (year: number, month: number) => {
    return `${year}年${month}月`;
  };

  return (
    <div className="month-tabs">
      {/* 各月に対してタブボタンを生成 */}
      {months.map((monthData, index) => (
        <button
          key={`${monthData.year}-${monthData.month}`} // 年月で一意のkeyを生成
          className={`tab ${selectedMonthIndex === index ? 'active' : ''}`} // 選択中のタブにactiveクラスを付与
          onClick={() => onMonthChange(index)} // クリック時に月のインデックスを通知
        >
          {getMonthLabel(monthData.year, monthData.month)}
        </button>
      ))}
    </div>
  );
};

export default MonthTabs;