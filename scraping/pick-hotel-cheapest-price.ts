import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const baseUrl = 'https://www.tour.ne.jp/j_hotel/list/?city1=10299&coty1=1&dist1=3&refpage=form';
  const results: string[] = [];

  // ヘッダー行を追加
  results.push('date\tlocation\tprice\thotel');

  for (let day = 1; day <= 1; day++) {
    const dateStr = `2025-07-${String(day).padStart(2, '0')}`;
    const dp_ymd = `202507${String(day).padStart(2, '0')}`;
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
  }

  await browser.close();

  // 同じディレクトリに price.tsv として保存
  const outputPath = new URL('../src/data/price.tsv', import.meta.url);
  writeFileSync(outputPath, results.join('\n'), 'utf-8');

  console.log(`✅ price.tsv に保存しました: ${outputPath}`);
})();
