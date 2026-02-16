import { By } from "selenium-webdriver";
import { BasePage } from "./BasePage.js";

export class PaymentsPage extends BasePage {
  async go() {
    await this.open("/");
    await this.clickByText("button", "Payments");
    await this.waitVisible(By.xpath('//h2[normalize-space()="Payments"]'));
  }

  async recordPayment({ tenantLabel, unitLabel, amountCents }) {
    const tenantSelect = await this.waitVisible(By.xpath('//label[normalize-space()="Tenant"]/following-sibling::select'));
    await tenantSelect.sendKeys(tenantLabel);

    const unitSelect = await this.waitVisible(By.xpath('//label[normalize-space()="Unit"]/following-sibling::select'));
    await unitSelect.sendKeys(unitLabel);

    await this.type(By.xpath('//label[normalize-space()="Amount (cents)"]/following-sibling::input'), String(amountCents));
    await this.clickByText("button", "Save");
  }

  async hasAmount(amountCents) {
    const amountText = `$${(amountCents / 100).toFixed(2)}`;
    const rows = await this.driver.findElements(By.xpath(`//td[normalize-space()="${amountText}"]`));
    return rows.length > 0;
  }
}
