import React from 'react';

/**
 * カレンダーの日付セルのプロパティ
 */
interface PriceCellProps {
  /** 日付（1-31） */
  day: number;
  /** その日の料金、データがない場合はundefined */
  price?: number;
  /** ホテル名 */
  hotel?: string;
  /** 過去の日付かどうか */
  isPast: boolean;
  /** その月の最安値かどうか */
  isMinPrice: boolean;
  /** その月の最安値 */
  minPriceOfMonth: number;
}

const PriceCell: React.FC<PriceCellProps> = ({ day, price, hotel, isPast, isMinPrice, minPriceOfMonth }) => {
  /**
   * 価格の高さに応じた強度レベルを算出
   * 最安値との比率で色の濃さを分類
   * 
   * @returns intensityレベル 0-5（高いほど安い）
   */
  const getPriceIntensity = () => {
    if (!price || minPriceOfMonth === 0) return 0;
    
    // 最安値との比率を算出（最安値からの上乗せ率）
    const ratio = (price - minPriceOfMonth) / minPriceOfMonth;
    if (ratio <= 0.1) return 5; // 最安値+10%以内: 最も濃い緑
    if (ratio <= 0.2) return 4; // 最安値+20%以内: 濃い緑
    if (ratio <= 0.4) return 3; // 最安値+40%以内: 中程度
    if (ratio <= 0.6) return 2; // 最安値+60%以内: 薄い
    return 1; // それ以上: 最も薄い
  };

  const intensity = getPriceIntensity();
  
  return (
    <div 
      className={`calendar-cell ${isPast ? 'past' : ''} ${isMinPrice ? 'min-price' : ''} ${price ? `intensity-${intensity}` : ''}`}
      title={hotel} // ホバー時にホテル名を表示
    >
      {/* 日付表示 */}
      <div className="day">{day}</div>
      
      {/* 価格がある場合のみ表示 */}
      {price && (
        <div className="price">
          <span className="currency">¥</span>
          <span className="amount">{price.toLocaleString()}</span> {/* カンマ区切りで数値表示 */}
          <span className="suffix">～</span>
        </div>
      )}
    </div>
  );
};

export default PriceCell;