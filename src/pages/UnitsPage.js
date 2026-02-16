import { By } from "selenium-webdriver";
import { BasePage } from "./BasePage.js";

export class UnitsPage extends BasePage {
  async go() {
    await this.open("/");
    await this.clickByText("button", "Units");
    await this.waitVisible(By.xpath('//h2[normalize-space()="Units"]'));
  }

  async createUnit({ property, unitNumber }) {
    await this.type(By.xpath('//label[normalize-space()="Property name"]/following-sibling::input'), property);
    await this.type(By.xpath('//label[normalize-space()="Unit number"]/following-sibling::input'), unitNumber);
    await this.clickByText("button", "Create");
  }

  async hasUnit(property, unitNumber) {
    const rows = await this.driver.findElements(By.xpath(`//td[normalize-space()="${property}"]/following-sibling::td[normalize-space()="${unitNumber}"]`));
    return rows.length > 0;
  }
}
