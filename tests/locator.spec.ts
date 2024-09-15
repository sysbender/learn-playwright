import {test , expect}from "@playwright/test";
import exp from "constants";


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


test('locating parent element', async( {page})=>{
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

test('reuse locator', async ({page}) =>{
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name:'Password'}).fill('pass123')
    await basicForm.locator('nb-checkbox').click()

    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')


})


test('extract text', async ({page})=>{

    // textContent
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})

    const   buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')
    // allTextContents
    const radioLabels = await page.locator('nb-card')
    .filter({hasText: 'Using the grid'}).locator('nb-radio').allTextContents()
    expect(radioLabels).toContain('Option 1')

    // inputValue
    const emailElement = basicForm.getByRole('textbox', {name: 'Email'})
    await emailElement.fill('test@test.com')
    const email = await emailElement.inputValue()
    expect(email).toEqual('test@test.com')
    // get attribute
    const placeHolder = await emailElement.getAttribute('placeholder')
    expect(placeHolder).toEqual('Email')
})


test.only('assertion', async({page})=>{
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const button = basicForm.locator('button')
    const   buttonText = await button.textContent()
    
// general assertion

expect(buttonText).toEqual('Submit')

// soft assertion
expect.soft(buttonText).toEqual('Submit123')
//  locator assertion
await expect(button).toHaveText('Submit')

})

