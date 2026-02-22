// @ts-check
import { test, expect } from '@playwright/test';

test.describe('加算', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1 + 2 = 3', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('3');
  });

  test('小数の加算: 1.5 + 2.3 = 3.8', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '.', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '.', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('3.8');
  });
});

test.describe('減算', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('5 − 3 = 2', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '−', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('2');
  });

  test('結果が負になる減算: 3 − 5 = -2', async ({ page }) => {
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '−', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('-2');
  });
});

test.describe('乗算', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('4 × 3 = 12', async ({ page }) => {
    await page.getByRole('button', { name: '4', exact: true }).click();
    await page.getByRole('button', { name: '×', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('12');
  });

  test('0との乗算: 5 × 0 = 0', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '×', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });
});

test.describe('除算', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('8 ÷ 2 = 4', async ({ page }) => {
    await page.getByRole('button', { name: '8', exact: true }).click();
    await page.getByRole('button', { name: '÷', exact: true }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('4');
  });

  test('割り切れない除算: 10 ÷ 3', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '÷', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    // 10 / 3 = 3.3333333... → 9文字以内に切り捨て → 3.3333333
    await expect(page.locator('.display-text')).toHaveText('3.3333333');
  });
});
