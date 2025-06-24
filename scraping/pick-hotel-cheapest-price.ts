import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const baseUrl = 'https://www.tour.ne.jp/j_hotel/list/?city1=10299&coty1=1&dist1=3&refpage=form';
  const results: string[] = [];

  // 開始日: 今日
  let current = new Date();
  // 終了日: 2ヶ月後の末日（3ヶ月目の0日＝末日）
  const endDate = new Date(current.getFullYear(), current.getMonth() + 3, 0);

  // ヘッダー行を追加
  results.push('date\tlocation\tprice\thotel');

  while (current <= endDate) {
    const dateStr = current.toISOString().slice(0, 10); // YYYY-MM-DD
    const dp_ymd = dateStr.replace(/-/g, '');
    const url = `${baseUrl}#dp_ymd=${dp_ymd}&dsp_sort=2&hotel_rank=4,5`;

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      // th.Area_plan_name が表示されるまで最大10秒待機
      await page.waitForSelector('section th.Area_plan_name', { timeout: 10000 });

      const firstSection = page.locator('section').first();
      const hotelName = await firstSection.locator('h2').first().innerText({ timeout: 3000 });
      const rawPrice = await firstSection.locator('b').first().innerText({ timeout: 3000 });
      const minPrice = rawPrice.replace(/[^\d]/g, '');  // 数字以外を削除

      results.push(`${dateStr}\t東京\t${minPrice}\t${hotelName}`);
    } catch (err) {
      results.push(`${dateStr}\t東京\t\t`);
    } finally {
      await page.close();
      await context.close();
    }
    // 次の日へ
    current.setDate(current.getDate() + 1);
  }

  await browser.close();

  // 同じディレクトリに price.tsv として保存
  const outputPath = new URL('../src/data/prices.tsv', import.meta.url);
  writeFileSync(outputPath, results.join('\n'), 'utf-8');

  console.log(`✅ price.tsv に保存しました: ${outputPath}`);
})();
