const {test, expect} = require('@playwright/test');

const email = "mb@gmail.com";
const password = "Mbasu@123";
const BASE_URL = "https://eventhub.rahulshettyacademy.com";

async function login(page){

    await page.goto(BASE_URL);
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.locator("#login-btn").click();
    await expect(page.getByRole("link",{name: 'Browse Events →'})).toBeVisible();

}

test('Verify single ticket booking is eligible for refund', async ({ page }) => {

await login(page);
await page.goto(`${BASE_URL}/events`);
await page.locator("[data-testid='book-now-btn']").first().click();
await page.getByLabel('Full Name').fill('Playwright User');
await page.locator('#customer-email').fill('bookinguser@mail.com');
await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
await page.locator('.confirm-booking-btn').click();
await page.getByText('View My Bookings').click();
await expect(page).toHaveURL(`${BASE_URL}/bookings`);
await page.getByRole("button",{name:'View Details'}).first().click();
await expect(page.getByText("Booking Information")).toBeVisible();
const bookingId = await page.locator("//div[@class='flex items-center gap-3 mb-2']/span").first().textContent();
const eventName = await page.locator("h1").textContent();
await expect(bookingId.charAt(0)).toEqual(eventName.charAt(0));
await page.getByTestId("check-refund-btn").click();
await expect(page.getByTestId("refund-spinner")).toBeVisible();
await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
await expect(page.locator("#refund-result")).toBeVisible();
await expect(page.locator("#refund-result")).toContainText("Eligible for refund.");
await expect(page.getByText(" Single-ticket bookings qualify for a full refund.")).toBeVisible();

});

test('Verify that group ticket booking is NOT eligible for refund', async ({ page }) => {

const num = 3;    
await login(page);
await page.goto(`${BASE_URL}/events`);
await page.locator("[data-testid='book-now-btn']").first().click();
await page.locator("button[class*='h-9']").last().click({clickCount: num-1});
const totalTickets = await page.locator("#ticket-count").textContent();
await page.getByLabel('Full Name').fill('Playwright User');
await page.locator('#customer-email').fill('bookinguser@mail.com');
await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
await page.locator('.confirm-booking-btn').click();
await page.getByText('View My Bookings').click();
await expect(page).toHaveURL(`${BASE_URL}/bookings`);
await page.getByRole("button",{name:'View Details'}).first().click();
await expect(page.getByText("Booking Information")).toBeVisible();
const bookingId = await page.locator("//div[@class='flex items-center gap-3 mb-2']/span").first().textContent();
const eventName = await page.locator("h1").textContent();
await expect(bookingId.charAt(0)).toEqual(eventName.charAt(0));
await page.getByTestId("check-refund-btn").click();
await expect(page.getByTestId("refund-spinner")).toBeVisible();
await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
await expect(page.locator("#refund-result")).toBeVisible();
await expect(page.locator("#refund-result")).toContainText("Not eligible for refund.");
await expect(page.getByText(`Group bookings (${totalTickets} tickets) are non-refundable.`)).toBeVisible();

});