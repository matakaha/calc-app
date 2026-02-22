// @ts-check
import { test, expect } from '@playwright/test';

test.describe('数字入力', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('0〜9の数字ボタンが正しく入力される', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('123');
  });

  test('先頭の0は置き換えられる', async ({ page }) => {
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('5');
  });

  test('0のみの場合に0が表示される', async ({ page }) => {
    await page.getByRole('button', { name: '0', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('0');
  });
});

test.describe('小数点入力', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('小数点を入力できる', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '.', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('1.5');
  });

  test('小数点を2回入力しても1つしか入らない', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '.', exact: true }).click();
    await page.getByRole('button', { name: '.', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('1.5');
  });

  test('初期状態から小数点入力すると 0. になる', async ({ page }) => {
    await page.getByRole('button', { name: '.', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('0.');
  });

  test('演算子の後に小数点を入力すると 0. になる', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '.', exact: true }).click();
    await expect(page.locator('.display-text')).toHaveText('0.');
  });
});
