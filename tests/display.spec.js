// @ts-check
import { test, expect } from '@playwright/test';

test.describe('ディスプレイ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('初期状態で 0 が表示される', async ({ page }) => {
    await expect(page.locator('.display-text')).toHaveText('0');
  });

  test('数字入力がディスプレイに反映される', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await expect(page.locator('.display-text')).toHaveText('5');
  });

  test('最大9桁まで入力できる', async ({ page }) => {
    for (const digit of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      await page.getByRole('button', { name: digit, exact: true }).click();
    }
    await expect(page.locator('.display-text')).toHaveText('123456789');
  });

  test('9桁を超える入力は無視される', async ({ page }) => {
    for (const digit of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      await page.getByRole('button', { name: digit, exact: true }).click();
    }
    await page.getByRole('button', { name: '0', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('123456789');
  });
});
