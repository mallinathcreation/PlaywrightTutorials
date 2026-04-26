const { test, expect } = require('@playwright/test');

const email = "mb@gmail.com";
const password = "Mbasu@123";
const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const eventTitle = `Test Event ${Date.now()}`;


async function login(page){

    await page.goto(BASE_URL);
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.locator("#login-btn").click();
    await expect(page.getByRole("link",{name: 'Browse Events →'})).toBeVisible();

}

function futureDateValue() {

const date = new Date();

date.setDate(date.getDate() + 3);

return date.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
}

test('Full Booking Flow with Event Creation', async ({ page }) => {

// --------------------------------------------------

// Step 1 — Login

// --------------------------------------------------

await login(page);
// --------------------------------------------------

// Step 2 — Create a new event

// --------------------------------------------------
const eventTitle = `Test Event ${Date.now()}`;
await page.goto(`${BASE_URL}/admin/events`);
await page.locator('#event-title-input').fill(eventTitle);
await page.locator('#admin-event-form textarea').fill('Automation test event description');
await page.getByLabel('City').fill('Bangalore');
await page.getByLabel('Venue').fill('Test Auditorium');
await page.getByLabel('Event Date & Time').fill(futureDateValue());
await page.getByLabel('Price ($)').fill('100');
await page.getByLabel('Total Seats').fill('50');
await page.locator('#add-event-btn').click();
await expect(page.getByText('Event created!')).toBeVisible();
// --------------------------------------------------

// Step 3 — Find event card & capture seats

// --------------------------------------------------

await page.goto(`${BASE_URL}/events`);
const eventCards = page.getByTestId('event-card');
await expect(eventCards.first()).toBeVisible();
const matchedCard = eventCards.filter({ hasText: eventTitle });
await expect(matchedCard).toBeVisible({ timeout: 5000 });
const seatsTextBefore = await matchedCard.locator('text=/seat/i').innerText();
const seatsBeforeBooking = parseInt(seatsTextBefore.match(/\d+/)[0]);
// --------------------------------------------------

// Step 4 — Start booking

// --------------------------------------------------

await matchedCard.getByTestId('book-now-btn').click();
// --------------------------------------------------

// Step 5 — Fill booking form

// --------------------------------------------------

await expect(page.locator('#ticket-count')).toHaveText('1');
await page.getByLabel('Full Name').fill('Playwright User');
await page.locator('#customer-email').fill('bookinguser@mail.com');
await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
await page.locator('.confirm-booking-btn').click();
// --------------------------------------------------

// Step 6 — Verify booking confirmation

// --------------------------------------------------

const bookingRefElement = page.locator('.booking-ref').first();
await expect(bookingRefElement).toBeVisible();
const bookingRef = (await bookingRefElement.innerText()).trim();
// --------------------------------------------------

// Step 7 — Verify in My Bookings

// --------------------------------------------------

await page.getByText('View My Bookings').click();
await expect(page).toHaveURL(`${BASE_URL}/bookings`);
const bookingCards = page.locator('#booking-card');
await expect(bookingCards.first()).toBeVisible();
const matchedBooking = bookingCards.filter({has: page.locator('.booking-ref', { hasText: bookingRef }),});
await expect(matchedBooking).toBeVisible();
await expect(matchedBooking).toContainText(eventTitle);
// --------------------------------------------------

// Step 8 — Verify seat reduction

// --------------------------------------------------

await page.goto(`${BASE_URL}/events`);
await expect(eventCards.first()).toBeVisible();
const updatedCard = eventCards.filter({ hasText: eventTitle });
await expect(updatedCard).toBeVisible();
const seatsTextAfter = await updatedCard.locator('text=/seat/i').innerText();
const seatsAfterBooking = parseInt(seatsTextAfter.match(/\d+/)[0]);
expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
console.log(`Seats before booking: ${seatsBeforeBooking}, Seats after booking: ${seatsAfterBooking}`);

});
