const {test, expect} = require('@playwright/test');



test('Browser Context Playwright test',async ({browser}) => {

    
    const context = await browser.newContext();
    const page = await context.newPage();
    const username  = page.locator('#username');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    
    //css selector
    /*type or fill does the same thing. 
    For the latst version of playwright type 
     is depricated.
    Fill method is used.*/

    await username.type('rahulshetty');
    await page.locator("[type='password']").type('Learning@830$3mK2');
    await signInBtn.click();

    //wait for the element to be visible    
    /*playwright has inbuilt wait for element to be visible. So we dont need to write 
    explicit wait unlike selenium. How much it will wait is defined 
    in the playwright.config.js file. By default it is 30 seconds. 
    We can change it to 40 seconds or more as per our requirement. */

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //clear the text field we need to use fill method with empty string.

    await username.fill('');
    await username.fill('rahulshettyacademy');
    await signInBtn.click();

    // nth - what ever we provide in the nth method it will return the element at that index. Index starts from 0.
    // first () - it will return the first element of the locator.

    /*for multiple elements playwright will return an array of elements. 
    So we can use nth method to get the element 
    at specific index or first method to get the first element.*/

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());

    /*playwright will not wait for allTextContents() as per their documentation.
    why? - because if theere are 0 elements too it is valid. So it didn't mentioned in
    their documentation. As list can be 0 values or no values*/

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

test('@web UI Controls',async ({page}) => {
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const dropdown = page.locator('select.form-control');
    const documentlink = page.locator("[href*='documents-request']");
    await dropdown.selectOption('consult');
    //await.pause() is used for debug purpose.
    //await page.pause();
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    //await is used when we perform any action.

    // isChecked() method is used to check whether the radio button is checked or not. 
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    /*for checkbox we have check() and uncheck() method. 
    It will check or uncheck the checkbox.*/
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentlink).toHaveAttribute('class','blinkingText');
    

});

test('Child Window Handling',async ({browser}) => {
    
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentlink = page.locator("[href*='documents-request']");
    const username  = page.locator('#username');

    //wait for the new page to open
    /*waitForEvent() method is used to wait for the new page to open. 
    It will return the new page object.*/

    /*Promise.all() method is used to wait for multiple promises to resolve.
    In this case we are waiting for the new page to open and the click action to be performed. 
    So we are passing both the promises in the Promise.all() method.*/

    //Asked in interview - how to handle child window in playwright?

    const [newPage]= await Promise.all(

    [
    context.waitForEvent('page'), //listen for any new page to open.
    documentlink.click()
])
    const text = await newPage.locator('.red').textContent();
    const arrayText= text.split('@')
    const domain = arrayText[1].split(' ')[0]
    // console.log(domain);
    await page.locator('#username').type(domain);

    /*it is not printing the text content. TextContent will return ony when it is attached
    to DOM. So for it inputValue() is used.*/
    console.log(await page.locator('#username').inputValue());

});