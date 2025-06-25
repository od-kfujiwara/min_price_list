/**
 * ホテル価格データのインターフェース
 */
export interface PriceData {
  /** 日付（YYYY-MM-DD形式） */
  date: string;
  /** 都市名 */
  location: string;
  /** 料金（円） */
  price: number;
  /** ホテル名 */
  hotel: string;
  /** 予約URL */
  url?: string;
}

/**
 * TSV形式の価格データをパースしてPriceData配列に変換
 * 
 * @param tsvContent - TSV形式の文字列データ
 * @returns パースされたPriceDataの配列
 */
export const parseTSV = (tsvContent: string): PriceData[] => {
  const lines = tsvContent.trim().split('\n');

  // ヘッダー行をスキップしてデータ行のみを処理
  return lines.slice(1).map(line => {
    const values = line.split('\t'); // タブで分割
    return {
      date: values[0],
      location: values[1],
      price: parseInt(values[2]), // 文字列を数値に変換
      hotel: values[3],
      url: values[4] || undefined // URL列が存在する場合は追加
    };
  });
};

/**
 * 指定した都市の価格データのみをフィルタリング
 * 
 * @param data - 全価格データ
 * @param location - フィルタリングする都市名
 * @returns 指定都市のデータのみ
 */
export const filterByLocation = (data: PriceData[], location: string): PriceData[] => {
  return data.filter(item => item.location === location);
};

/**
 * 指定した年月の価格データのみをフィルタリング
 * 
 * @param data - 価格データ配列
 * @param year - 年（4桁）
 * @param month - 月（1-12）
 * @returns 指定年月のデータのみ
 */
export const filterByMonth = (data: PriceData[], year: number, month: number): PriceData[] => {
  return data.filter(item => {
    const date = new Date(item.date);
    // JavaScriptのgetMonth()は0ベースなのでmonth-1で比較
    return date.getFullYear() === year && date.getMonth() === month - 1;
  });
};

/**
 * 指定したデータ群から最安値を取得
 * 
 * @param data - 価格データ配列
 * @returns 最安値、データが空の場合0を返す
 */
export const getMinPriceForMonth = (data: PriceData[]): number => {
  if (data.length === 0) return 0;
  // 全価格から最小値を抽出
  return Math.min(...data.map(item => item.price));
};
