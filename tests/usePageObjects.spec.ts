import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage.ts";

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
