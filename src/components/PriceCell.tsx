import React from 'react';

interface PriceCellProps {
  day: number;
  price?: number;
  hotel?: string;
  isPast: boolean;
  isMinPrice: boolean;
  minPriceOfMonth: number;
}

const PriceCell: React.FC<PriceCellProps> = ({ day, price, hotel, isPast, isMinPrice, minPriceOfMonth }) => {
  const getPriceIntensity = () => {
    if (!price || minPriceOfMonth === 0) return 0;
    
    const ratio = (price - minPriceOfMonth) / minPriceOfMonth;
    if (ratio <= 0.1) return 5;
    if (ratio <= 0.2) return 4;
    if (ratio <= 0.4) return 3;
    if (ratio <= 0.6) return 2;
    return 1;
  };

  const intensity = getPriceIntensity();
  
  return (
    <div 
      className={`calendar-cell ${isPast ? 'past' : ''} ${isMinPrice ? 'min-price' : ''} ${price ? `intensity-${intensity}` : ''}`}
      title={hotel}
    >
      <div className="day">{day}</div>
      {price && (
        <div className="price">
          <span className="currency">¥</span>
          <span className="amount">{price.toLocaleString()}</span>
          <span className="suffix">～</span>
        </div>
      )}
    </div>
  );
};

export default PriceCell;