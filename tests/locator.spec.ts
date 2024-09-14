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

test("visible locator", async ({page})=>{
    await page.getByRole('textbox', {name:'Email'}).first().click();
    await page.getByRole('button', {name: 'Sign in'}).first().click();

    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.getByTitle('IoT Dashboard').click();
    // data-testid attribute
    await page.getByTestId('').click();




})

test( ' child locator', async ({page}) =>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()


    await page.locator('nb-card').nth(3).getByRole('button').click()
})


test.only('locating parent element', async( {page})=>{
    //hasText
    await page.locator('nb-card', {hasText:"Using the Grid"})
    .getByRole('textbox', {name:"Email"}).click()
    // has - locator
    await page.locator('nb-card', {has: page.locator('#inputEmail1')})
    .getByRole('textbox', {name:"Email"}).click()
    //  filter
    await page.locator('nb-card')
    .filter({hasText:"Basic form"})
    .getByRole('textbox', {name:"Email"})
    .click()

    //fiter two times
    await page.locator('nb-card')
    .filter({has: page.locator('nb-checkbox')})
    .filter({hasText: 'Sign in'})
    .click()

    // .. - one level up, not very good
    await page.locator(':text-is("Using the Grid")')
    .locator('..')
    .getByRole('textbox', {name:"Email"})
    .click()
})
