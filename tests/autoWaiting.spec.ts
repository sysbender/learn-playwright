import {test, expect} from '@playwright/test'

test.beforeEach( async({page})=>{
    page.goto('http://www.uitestingplayground.com/ajax')
    const buttonText = 'Button Triggering AJAX Request'
    await page.getByText(buttonText).click()
})


test('no waiting' , async ({page})=>{
    const button = page.locator('.bg-success')
     const buttonText = 'Data loaded with AJAX get request.'
    // not wait 
    const text = await button.allTextContents()
    expect.soft(text).toContain(buttonText)

})


test('custom waiting' , async ({page})=>{
    const button = page.locator('.bg-success')
     const buttonText = 'Data loaded with AJAX get request.'
    // custom wait 

    await button.waitFor({state : "attached"})
    const textCustom = await button.allTextContents()
    expect.soft(textCustom).toContain(buttonText)


})

test('auto waiting' , async ({page})=>{
    const button = page.locator('.bg-success')
    // auto wait
    const buttonText = 'Data loaded with AJAX get request.'
    const allText = await button.textContent()
    expect.soft(allText).toEqual(buttonText)


})