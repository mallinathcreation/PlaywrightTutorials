// const { test, expect, request } = require('@playwright/test');

// const Yahoo_email_payload = { userEmail: "naveen@Yhaoo.com", userPassword: "Nav@1234" };
// const gmail_payload = { userEmail: "naveen@gmail.com", userPassword: "Nav@1234" };
// const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";
// const BASE_URL = "https://eventhub.rahulshettyacademy.com/login";

// async function loginAS(page, user) {

//     await page.goto(BASE_URL);
//     await page.getByPlaceholder("you@email.com").fill(user.userEmail);
//     await page.getByLabel("Password").fill(user.userPassword);
//     await page.locator("#login-btn").click();
//     await expect(page.getByRole("link", { name: 'Browse Events →' })).toBeVisible();
// }

// test('Cross Browser Booking Denied', async ({ page }) => {

//     //Step 1 -  Login as Yahoo user via API

//     const apiContext = await request.newContext();
//     const loginResponse = await apiContext.post(`${API_URL}/auth/login`,
//         {
//             data: { email: Yahoo_email_payload.userEmail, password: Yahoo_email_payload.userPassword },
//         }
//     );
//     await expect(loginResponse.ok).toBeTruthy();
//     const loginJson = await loginResponse.json();
//     console.log('Login Response:', loginJson);
//     const { token } = loginJson;

//     //Step 2 -Fetch events via API to get a valid event ID

//     const eventReq = await apiContext.get(`${API_URL}/events`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }
//     );
//     await expect(eventReq.ok).toBeTruthy();
//     const eventJson = await eventReq.json();
//     console.log('Events Response:', eventJson);
//     const eventId = eventJson.data[0].id;
//     console.log(eventId);

//     //Step 3 — Create a booking via API as Yahoo user
//     const bookingReq = await apiContext.post(`${API_URL}/bookings`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             data: {
//                 eventId,
//                 "customerName": "Yahoo User",
//                 "customerEmail": Yahoo_email_payload.userEmail,
//                 "customerPhone": "12356789",
//                 "quantity": 1,
//             }

//         }
//     );
//     await expect(bookingReq.ok).toBeTruthy();
//     const bookingjson = await bookingReq.json();
//     console.log('Booking Response:', bookingjson);
//     // Check if data is an array (list of bookings) or a single booking object
//     const yahooBookingId = Array.isArray(bookingjson.data) ? bookingjson.data[0]?.id : bookingjson.data?.id;
//     console.log('Booking ID:', yahooBookingId);

//     //Step 4 — Login as Gmail user via browser UI
//     await loginAS(page, gmail_payload);

//     //Step 5 — Navigate to Yahoo's booking URL as Gmail user
//     await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });

//     //Step 6 — Validate Access Denied
//     await expect(page.getByText("Access Denied")).toBeVisible();
//     await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();


// });


