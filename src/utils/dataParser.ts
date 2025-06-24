export interface PriceData {
  date: string;
  location: string;
  price: number;
  hotel: string;
}

export const parseTSV = (tsvContent: string): PriceData[] => {
  const lines = tsvContent.trim().split('\n');

  return lines.slice(1).map(line => {
    const values = line.split('\t');
    return {
      date: values[0],
      location: values[1],
      price: parseInt(values[2]),
      hotel: values[3]
    };
  });
};

export const filterByLocation = (data: PriceData[], location: string): PriceData[] => {
  return data.filter(item => item.location === location);
};

export const filterByMonth = (data: PriceData[], year: number, month: number): PriceData[] => {
  return data.filter(item => {
    const date = new Date(item.date);
    return date.getFullYear() === year && date.getMonth() === month - 1;
  });
};

export const getMinPriceForMonth = (data: PriceData[]): number => {
  if (data.length === 0) return 0;
  return Math.min(...data.map(item => item.price));
};
