import {test, Page} from "@playwright/test";


test.beforeEach( async ({page})=>{
page.goto('http://192.168.0.142:4200')
})
test('test' , async (  {page})=>{
   
    
})