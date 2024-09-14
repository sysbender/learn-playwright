import {test }from "@playwright/test";


test.beforeEach( async ({page})=>{
    await page.goto('http://192.168.0.142:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
test('locator syntax', async ({page})=>{
    // by tag name
    await page.locator('input').first().click()
    // by ID
    await page.locator('#inputEmail1').first().click()

    // by class value one
    page.locator('.shape-rectangle')
    console.log('------the')
    // by attribute
    await page.locator('[placeholder="Email"]').first().click()
    // by class value full

     await page.locator('[class="appearance-filled size-medium shape-rectangle status-primary nb-transition"]').first().click()
     //combine 
     //by partial text
     await page.locator(':text("Using")').click()
     //by exact text
     await page.locator(':text-is("Using the Grid")').click()

    
})

test.only("visible locator", async ({page})=>{
    await page.getByRole('textbox', {name:'Email'}).first().click();
    await page.getByRole('button', {name: 'Sign in'}).first().click();
    
    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.getByTitle('IoT Dashboard').click();
    // data-testid attribute
    await page.getByTestId('').click();




})