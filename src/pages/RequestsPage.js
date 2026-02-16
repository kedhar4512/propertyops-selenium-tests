import { By } from "selenium-webdriver";
import { BasePage } from "./BasePage.js";

export class RequestsPage extends BasePage {
  async go() {
    await this.open("/");
    await this.clickByText("button", "Requests");
    await this.waitVisible(By.xpath('//h2[normalize-space()="Maintenance Requests"]'));
  }

  async createRequest({ tenantLabel, unitLabel, title }) {
    // Tenant select
    const tenantSelect = await this.waitVisible(By.xpath('//label[normalize-space()="Tenant"]/following-sibling::select'));
    await tenantSelect.sendKeys(tenantLabel);

    const unitSelect = await this.waitVisible(By.xpath('//label[normalize-space()="Unit"]/following-sibling::select'));
    await unitSelect.sendKeys(unitLabel);

    await this.type(By.xpath('//label[normalize-space()="Title"]/following-sibling::input'), title);
    await this.clickByText("button", "Create");
  }

  async setInProgressFor(title) {
    const btn = await this.waitVisible(By.xpath(`//td[normalize-space()="${title}"]/following-sibling::td//button[normalize-space()="In progress"]`));
    await btn.click();
  }

  async statusFor(title) {
    const statusCell = await this.waitVisible(By.xpath(`//td[normalize-space()="${title}"]/following-sibling::td[last()-1]`));
    return statusCell.getText();
  }
}
