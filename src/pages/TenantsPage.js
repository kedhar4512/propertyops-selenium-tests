import { By } from "selenium-webdriver";
import { BasePage } from "./BasePage.js";

export class TenantsPage extends BasePage {
  async go() {
    await this.open("/");
    await this.clickByText("button", "Tenants");
    await this.waitVisible(By.xpath('//h2[normalize-space()="Tenants"]'));
  }

  async createTenant({ firstName, lastName, email }) {
    await this.type(By.xpath('//label[normalize-space()="First name"]/following-sibling::input'), firstName);
    await this.type(By.xpath('//label[normalize-space()="Last name"]/following-sibling::input'), lastName);
    await this.type(By.xpath('//label[normalize-space()="Email"]/following-sibling::input'), email);
    await this.clickByText("button", "Create");
  }

  async hasTenant(email) {
    const rows = await this.driver.findElements(By.xpath(`//td[normalize-space()="${email}"]`));
    return rows.length > 0;
  }
}
