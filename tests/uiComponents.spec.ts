import {test, expect} from '@playwright/test'
import exp from 'constants'


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

    test('radio', async ({page})=>{
        const gridForm = page.locator('nb-card')
        .filter({hasText: "Using the Grid"})

        // select radio by label or role
        const radio1Element =  gridForm.getByLabel('Option 1')
        await radio1Element.check({force: true})

        const radio2Element =  gridForm.getByRole('radio', {name: 'Option 2'})
        await radio2Element.check({force: true})

        // assert generic
        expect ( await radio1Element.isChecked()).toBeFalsy()
        //assert locator
        await expect(radio2Element).toBeChecked()
    })


})

test.describe('Form Model page' , ()=>{

    test.beforeEach( async ({page}) =>{
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();
    })

    test('checkbox', async({page}) =>{
       
        const check1 = page.getByRole('checkbox', {name:'Hide on click'})
        const check2 = page.getByRole('checkbox', {name:'Prevent arising of duplicate toast'})
        const check3 = page.getByRole('checkbox', {name:'Show toast with icon'})

        await check1.check({force: true})
        await check2.uncheck({force: true})
        await check3.uncheck({force: true})


        const boxes = page.getByRole('checkbox')
        for( const box of  await boxes.all()){ //convert to array
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy()
        }
    } )



})

 
    test('list and dropdown' , async ({page})=>{
        const menu = page.locator('ngx-header nb-select')
        await menu.click()

        // getByRole('list') - if ul
        // getByRole('listitem') - if li

        const listElem = page.getByRole('list')
        //const listItemElements = listElem.locator('nb-option')

        const listItemElements = page.locator('nb-option-list nb-option')
        await expect(listItemElements).toHaveText(['Light', 'Dark', "Cosmic", "Corporate"])
        await listItemElements.filter({hasText: 'Cosmic'}).click()

      
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color' , 'rgb(50, 50, 89)')


        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)",
        }


        for (const color in colors){
            // click list
            await menu.click()

            // click item 
            await listItemElements.filter({hasText: color}).click()

            // check color
            await expect(header).toHaveCSS('background-color', colors[color])
        }

    })
 