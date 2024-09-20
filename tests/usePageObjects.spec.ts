import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage.ts";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage.ts";

test.beforeEach(async ({ page }) => {
  await page.goto("http://192.168.0.142:4200");
});

test("navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
});

test("fill form", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();

  const formPage = new FormLayoutsPage(page);

  await formPage.submitForm("test@test.com", "hello", "Option 1");

  await formPage.submitInlineForm("John Smith", "john@gmail.com", false);
});
