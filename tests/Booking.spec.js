const { test, expect } = require('@playwright/test');

const email = "mb@gmail.com";
const password = "Mbasu@123";
const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const eventTitle = 'Test Event ${Date.now()}';
let bookingRef = '';
let seatBeforeBooking = "";
let seatAfterBooking = "";

async function login(page){

    await page.goto(BASE_URL);
     await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.locator("#login-btn").click();
    await expect(page.getByRole("link",{name: 'Browse Events →'})).toBeVisible();

}

async function



test('New Event Creation', async ({ page }) => {

    await login(page);
    await page.goto(`${BASE_URL}/admin/events`);
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("This is a test event created by Playwright automation.");
    await page.getByLabel("City").fill("Kolkata");
    await page.getByLabel("Venue").fill("New Town");
    await page.getByLabel("Event Date & Time").fill("2027-12-31T10:00");
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator('#add-event-btn').click();
    await expect(page.getByText("Event created!")).toBeVisible();
});

test('Find the event card and capture seats', async ({ page }) => {

    await login(page);
    await page.goto(`${BASE_URL}/events`); 
    const eventCards =  page.getByTestId("event-card");
    await expect(eventCards.first()).toBeVisible();
    const targetEventCard = eventCards.filter({ hasText: eventTitle });
    await expect(targetEventCard).toBeVisible({ timeout: 5000 });
    seatBeforeBooking = parseInt(await targetEventCard.getByText("seat").first().innerText()[0]);
    console.log(seatBeforeBooking);

    //Booking the event
    await targetEventCard.getByTestId("book-now-btn").click();
    const ticketCount = page.locator('#ticket-count');
    await expect(ticketCount).toHaveText('1');
    await page.getByLabel("Full Name").fill("Mallinath");
    await page.locator("#customer-email").fill("test.student@example.com");
    await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
    await page.locator('.confirm-booking-btn').click();
    const bookingRefEl  = await page.locator(".booking-ref").first();
    await expect(bookingRefEl).toBeVisible();
    bookingRef = (await bookingRefEl.innerText()).trim();
    expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());
    await page.getByRole("link",{name:'View My Bookings'}).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

});

test('Verify in My Bookings', async ({ page }) => {

    await login(page);
    await page.goto(`${BASE_URL}/bookings`);
    const bokingCards = page.getByTestId("booking-card");
    await expect(bokingCards.first()).toBeVisible();
    const matchingCard = bokingCards.filter({ has: page.locator('.booking-ref', { hasText: `${bookingRef}`})});
    await expect(matchingCard).toBeVisible();
    await expect(matchingCard).toContainText(eventTitle);

});

test('Verify Seat Reduction', async ({ page }) => {

    await login(page);
    await page.goto(`${BASE_URL}/events`);
    const eventCards =  page.getByTestId("event-card");
    await expect(eventCards.first()).toBeVisible();
    const targetEventCard = eventCards.filter({ hasText: eventTitle });
    await expect(targetEventCard).toBeVisible({ timeout: 5000 });
    seatAfterBooking = parseInt(await targetEventCard.getByText("seat").first().innerText()[0]);
    console.log(seatAfterBooking);
    expect(seatAfterBooking).toBe(seatBeforeBooking - 1);
});
