import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1280, height: 720 });

  const screenshotsDir = path.resolve(__dirname, '../public/images');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const baseUrl = 'http://localhost:3100'; 

  try {
    console.log(`Navigating to ${baseUrl}...`);
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    
    // ============================================
    // 1. ダッシュボード全体 (初期状態)
    // ============================================
    await page.screenshot({ path: path.join(screenshotsDir, 'dashboard.png') });
    console.log('Captured: dashboard.png (全体画面)');

    // ============================================
    // 2. サイドバーのみ (新規ページボタンを含む)
    // ============================================
    const sidebar = page.locator('.bg-zinc-900').first();
    if (await sidebar.isVisible()) {
      await sidebar.screenshot({ path: path.join(screenshotsDir, 'sidebar-only.png') });
      console.log('Captured: sidebar-only.png (サイドバーのみ)');
    }

    // ============================================
    // 3. 新規ページボタンをホバー状態でキャプチャ
    // ============================================
    const newPageBtn = page.getByRole('button', { name: '新規ページ' });
    if (await newPageBtn.isVisible()) {
      await newPageBtn.hover();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(screenshotsDir, 'new-page-button-hover.png') });
      console.log('Captured: new-page-button-hover.png (新規ページボタンホバー)');
      
      // クリックして新規ページ作成
      await newPageBtn.click();
      await page.waitForTimeout(1000);
    }

    // ============================================
    // 4. タイトル入力前の状態 (「無題」表示)
    // ============================================
    await page.screenshot({ path: path.join(screenshotsDir, 'empty-page.png') });
    console.log('Captured: empty-page.png (新規ページ作成直後)');

    // ============================================
    // 5. タイトル編集中
    // ============================================
    const titleInput = page.locator('input[placeholder="無題"]');
    if (await titleInput.isVisible()) {
      await titleInput.click();
      await page.waitForTimeout(200);
      await page.screenshot({ path: path.join(screenshotsDir, 'title-focus.png') });
      console.log('Captured: title-focus.png (タイトルフォーカス)');
      
      await titleInput.fill('会議メモ');
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(screenshotsDir, 'title-editing.png') });
      console.log('Captured: title-editing.png (タイトル入力中)');
    }

    // ============================================
    // 6. 本文エリアをクリックして入力開始
    // ============================================
    await page.mouse.click(400, 300);
    await page.waitForTimeout(200);
    await page.keyboard.type('今日の議題について');
    await page.screenshot({ path: path.join(screenshotsDir, 'text-input.png') });
    console.log('Captured: text-input.png (テキスト入力)');

    // ============================================
    // 7. スラッシュコマンドメニュー表示
    // ============================================
    await page.keyboard.press('Enter');
    await page.keyboard.type('/');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsDir, 'slash-menu-open.png') });
    console.log('Captured: slash-menu-open.png (スラッシュメニュー)');

    // ============================================
    // 8. 見出しを選択した後の状態
    // ============================================
    // 最初の項目(見出し1)を選択
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.keyboard.type('プロジェクト進捗');
    await page.screenshot({ path: path.join(screenshotsDir, 'heading-created.png') });
    console.log('Captured: heading-created.png (見出し作成後)');

    // ============================================
    // 9. 箇条書きリストの例
    // ============================================
    await page.keyboard.press('Enter');
    await page.keyboard.type('- ');
    await page.waitForTimeout(200);
    await page.keyboard.type('タスクA完了');
    await page.keyboard.press('Enter');
    await page.keyboard.type('タスクB進行中');
    await page.keyboard.press('Enter');
    await page.keyboard.type('タスクC未着手');
    await page.screenshot({ path: path.join(screenshotsDir, 'bullet-list-example.png') });
    console.log('Captured: bullet-list-example.png (箇条書きリスト)');

    // ============================================
    // 10. テキスト選択 (フォーマットメニュー表示のため)
    // ============================================
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.type('重要なテキストを太字にする');
    // テキストを選択
    await page.keyboard.down('Shift');
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('ArrowLeft');
    }
    await page.keyboard.up('Shift');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsDir, 'text-selected.png') });
    console.log('Captured: text-selected.png (テキスト選択)');

    // ============================================
    // 11. 完成したページの全体像
    // ============================================
    await page.mouse.click(100, 100); // 選択解除
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(screenshotsDir, 'complete-page.png') });
    console.log('Captured: complete-page.png (完成したページ)');

  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
