import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async formLayoutsPage() {
    await this.click2Text("Forms", "Form Layouts");
  }

  async datepickerPage() {
    await this.click2Text("Forms", "Datepicker");
  }

  async smartTablePage() {
    await this.click2Text("Tables & Data", "Smart Table");
  }

  async toastrPage() {
    await this.click2Text("Modal & Overlays", "Toastr");
  }

  async tooltipPage() {
    await this.click2Text("Modal & Overlays", "Tooltip");
  }

  private async click2Text(text1: string, text2: string) {
    const elem1 = this.page.getByText(text1);
    const expandAttr = "aria-expanded";
    const isExpand = await elem1.getAttribute(expandAttr);
    if (!isExpand) {
      await this.page.getByText(text1).click();
    }
    await this.page.getByText(text2).click();
  }
}
