import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../Utils_ts/APIUtils';

interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

interface OrderPayload {
  orders: Array<{
    country: string;
    productOrderedId: string;
  }>;
}

interface OrderResponse {
  token: string;
  orderID: string;
}

const loginPayload: LoginPayload = {
  userEmail: 'mbasu@gmail.com',
  userPassword: 'Mbasu@123',
};

let response: OrderResponse;

const orderPayload: OrderPayload = {
  orders: [{ country: 'Cuba', productOrderedId: '6960eac0c941646b7a8b3e68' }],
};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test('@api Place the Order', async ({ page }) => {
  await page.addInitScript((value: string) => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator("li [routerlink*='myorders']").click();
  await page.locator('.table').waitFor();
  const rows = await page.locator('tbody tr');

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderID = await rows.nth(i).locator('th').textContent();
    if (response.orderID.includes(rowOrderID ?? '')) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(response.orderID.includes(orderIdDetails ?? '')).toBeTruthy();
});
