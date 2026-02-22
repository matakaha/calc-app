// @ts-check
import { test, expect } from '@playwright/test';

test.describe('エラー処理', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ゼロ除算で ZERO DIV が表示される', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '÷', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('ZERO DIV');
  });

  test('エラー表示中は AC のみ受け付ける', async ({ page }) => {
    // ゼロ除算でエラー状態にする
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '÷', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('ZERO DIV');

    // 数字キーを押しても変わらない
    await page.getByRole('button', { name: '1', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('ZERO DIV');

    // ACで復帰
    await page.getByRole('button', { name: 'AC' }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });

  test('演算子連鎖中のゼロ除算で ZERO DIV が表示される', async ({ page }) => {
    await page.getByRole('button', { name: '6', exact: true }).click();
    await page.getByRole('button', { name: '÷', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('ZERO DIV');
  });
});
