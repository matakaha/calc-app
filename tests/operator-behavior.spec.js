// @ts-check
import { test, expect } from '@playwright/test';

test.describe('演算子の連続入力', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('演算子を連続入力すると最後の演算子が有効になる', async ({ page }) => {
    // 5 + − → 有効な演算子は − → 5 − 3 = 2
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '−', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('2');
  });

  test('演算子を3回連続入力しても最後が有効', async ({ page }) => {
    // 8 + − × → 有効な演算子は × → 8 × 2 = 16
    await page.getByRole('button', { name: '8', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '−', exact: true }).click();
    await page.getByRole('button', { name: '×', exact: true }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('16');
  });
});

test.describe('演算子の連鎖計算', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('連鎖計算: 2 + 3 + 4 = 9', async ({ page }) => {
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    // 2 + 3 の中間結果 5 が表示される
    await expect(page.locator('.display-text')).toHaveText('5');
    await page.getByRole('button', { name: '4', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('9');
  });

  test('連鎖計算: 10 − 3 × 2 = 14', async ({ page }) => {
    // 左から順に計算: (10 - 3) × 2 = 14
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '−', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '×', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('7');
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('14');
  });
});

test.describe('= の動作', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('演算子未入力で = を押しても何も起きない', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('5');
  });

  test('計算後に新しい数字を入力できる', async ({ page }) => {
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('5');

    // 計算結果の後に新しい演算を開始
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('6');
  });
});
