import { Page } from "@playwright/test";

export class FormLayoutsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submitForm(email: string, password: string, optionText: string) {
    const form = this.page.locator("nb-card", { hasText: "Using the Grid" });
    await form.getByRole("textbox", { name: "Email" }).fill(email);
    await form.getByRole("textbox", { name: "password" }).fill(password);
    await form.getByRole("radio", { name: optionText }).check({ force: true });
    await form.getByRole("button").click();
  }

  async submitInlineForm(name: string, email: string, rememberMe: boolean) {
    const inlineForm = this.page.locator("nb-card", { hasText: "Inline form" });
    await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await inlineForm.getByRole("textbox", { name: "Email" }).fill(email);
    if (rememberMe) {
      await inlineForm.getByRole("checkbox").check({ force: true });
    }

    await inlineForm.getByRole("button").click();
  }
}
