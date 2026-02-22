// @ts-check
import { test, expect } from '@playwright/test';

test.describe('AC（All Clear）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ACで入力がリセットされ 0 に戻る', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: 'AC' }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });

  test('演算途中でACを押すとリセットされる', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: 'AC' }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });
});

test.describe('DEL（Delete）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('最後の1文字が削除される', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: 'DEL' }).click();
    await expect(page.locator('.display-text')).toHaveText('12');
  });

  test('1桁の数字をDELすると 0 になる', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: 'DEL' }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });

  test('0の状態でDELしても 0 のまま', async ({ page }) => {
    await page.getByRole('button', { name: 'DEL' }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });

  test('負の1桁の数字をDELすると 0 になる', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '+/−' }).click();
    await page.getByRole('button', { name: 'DEL' }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });
});

test.describe('+/−（符号切替）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('正の数を負にする', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '+/−' }).click();
    await expect(page.locator('.display-text')).toHaveText('-5');
  });

  test('負の数を正にする', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '+/−' }).click();
    await page.getByRole('button', { name: '+/−' }).click();
    await expect(page.locator('.display-text')).toHaveText('5');
  });

  test('0に対して符号切替しても 0 のまま', async ({ page }) => {
    await page.getByRole('button', { name: '+/−' }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });
});
