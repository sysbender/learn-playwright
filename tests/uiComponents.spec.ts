import {test, expect} from '@playwright/test'


// go to homepage
test.beforeEach( async ({page}) =>{
    page.goto('http://192.168.0.142:4200')
})


test.describe('Form Layouts page' , ()=>{

    test.beforeEach( async ({page}) =>{
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })



    test('input fields', async ({page})=>{

        const email ='test@test.com'
        const gridForm = page.locator('nb-card')
        .filter({hasText:'Using the Grid'})


        const emailElement = gridForm.getByRole('textbox', {name: "Email"})
        await emailElement.fill('test@test.com')
        await emailElement.clear()
        await emailElement.pressSequentially("test@test.com", {delay: 100})

        // assertion - generic

        expect ( await emailElement.inputValue()).toEqual(email)
        

        // assertion - locator
        await expect(emailElement).toHaveValue(email)
 

    })



})


