const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');

const loginPayload = { userEmail: 'mbasu@gmail.com', userPassword: 'Mbasu@123' };
let response;
const orderPayload = { orders: [{ country: 'Cuba', productOrderedId: '6960eac0c941646b7a8b3e68' }] };
const fakePayloadOrders = { data: [], message: "No Orders" };

//before all test cases this will execute. It will execute only once.
//Use playwright API testing to get the token and use that token in the client app login test case.
// So that we don't have to write the login code in the client app login
// test case. We can directly use the token to set it in local storage
// and then we can directly go to the client app and perform the actions.

test.beforeAll(async () => {

  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);

});


//before each test case this will execute
// test.beforeEach(async () => {});

test('Place the Order', async ({ page }) => {

  //to set the token in local storage we have to use addInitScript() method.
  // It will set the token in local storage before the page is loaded.
  //login code is not required.

  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client/');


  //to mock any url we can do it by
  //https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/* --
  //-->* means any url which is starting with this url. It is called as wildcard.As account will varry.

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      //intercepting response -API response
      //{playwright fake response}--> browser --> render data on front end
      const response = await page.request.fetch(route.request());
      //conveting the response to json format
      let body = JSON.stringify(fakePayloadOrders);
      await route.fulfill(
        {
          response,
          body,
        }
      );
    }
  );
  await page.locator("li [routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  console.log(await page.locator(".mt-4").textContent());
  // await page.locator('.table').waitFor();
  // const rows = await page.locator('tbody tr');


});