import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

(async () => {
  console.log('🚀 スクレイピング開始');
  const browser = await chromium.launch({ headless: true });
  const baseUrl = 'https://www.tour.ne.jp/j_hotel/list/?city1=10299&coty1=1&dist1=3&refpage=form';
  const results: string[] = [];

  // 開始日: 今日
  let current = new Date();
  // 終了日: 2ヶ月後の末日（3ヶ月目の0日＝末日）
  const endDate = new Date(current.getFullYear(), current.getMonth() + 2, 0);
  
  const totalDays = Math.ceil((endDate.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  console.log(`📅 期間: ${current.toISOString().slice(0, 10)} 〜 ${endDate.toISOString().slice(0, 10)} (${totalDays}日間)`);

  // ヘッダー行を追加
  results.push('date\tlocation\tprice\thotel\turl');

  let processedCount = 0;
  let successCount = 0;
  let failCount = 0;
  
  while (current <= endDate) {
    processedCount++;
    const dateStr = current.toISOString().slice(0, 10); // YYYY-MM-DD
    const dp_ymd = dateStr.replace(/-/g, '');
    const url = `${baseUrl}#dp_ymd=${dp_ymd}&dsp_sort=2&hotel_rank=4,5`;
    
    console.log(`\n[${processedCount}/${totalDays}] 🔍 ${dateStr} の処理開始`);
    console.log(`   URL: ${url}`);

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      console.log('   🌐 ページ読み込み中...');
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      console.log('   ✅ ページ読み込み完了');

      // th.Area_plan_name が表示されるまで最大10秒徆機
      console.log('   ⏳ ホテルデータの表示を待機中...');
      await page.waitForSelector('section th.Area_plan_name', { timeout: 10000 });
      console.log('   ✅ ホテルデータ表示確認');

      const firstSection = page.locator('section').first();
      
      console.log('   🏨 ホテル名を取得中...');
      const hotelName = await firstSection.locator('h2').first().innerText({ timeout: 3000 });
      console.log(`   ✅ ホテル名: ${hotelName}`);
      
      console.log('   💰 価格を取得中...');
      const rawPrice = await firstSection.locator('b').first().innerText({ timeout: 3000 });
      const minPrice = rawPrice.replace(/[^\d]/g, '');  // 数字以外を削除
      console.log(`   ✅ 最安値: ¥${minPrice}`);

      results.push(`${dateStr}\t東京\t${minPrice}\t${hotelName}\t${url}`);
      successCount++;
      console.log(`   ✨ ${dateStr} の処理成功`);
    } catch (err) {
      failCount++;
      console.error(`   ❌ ${dateStr} の処理失敗`);
      console.error(`   エラー詳細: ${err instanceof Error ? err.message : String(err)}`);
      results.push(`${dateStr}\t東京\t\t\t`);
      
      // エラー時は処理を終了
      await page.close();
      await context.close();
      console.error(`\n⚠️  エラーが発生したため、処理を中断します`);
      break;
    }
    
    await page.close();
    await context.close();
    
    // 次の日へ
    current.setDate(current.getDate() + 1);
  }

  await browser.close();

  // 同じディレクトリに price.tsv として保存
  const outputPath = new URL('../src/data/prices.tsv', import.meta.url);
  writeFileSync(outputPath, results.join('\n'), 'utf-8');

  console.log(`\n📊 スクレイピング完了`);
  console.log(`   成功: ${successCount}件`);
  console.log(`   失敗: ${failCount}件`);
  console.log(`   合計: ${processedCount}件`);
  console.log(`✅ price.tsv に保存しました: ${outputPath}`);
})();

