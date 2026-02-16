import { By, until } from "selenium-webdriver";

export class BasePage {
  constructor(driver, baseUrl) {
    this.driver = driver;
    this.baseUrl = baseUrl;
  }

  async open(path = "/") {
    await this.driver.get(`${this.baseUrl}${path}`);
  }

  async clickByText(tag, text) {
    const el = await this.driver.findElement(By.xpath(`//${tag}[normalize-space()="${text}"]`));
    await el.click();
  }

  async waitVisible(locator, timeout = 15000) {
    const el = await this.driver.wait(until.elementLocated(locator), timeout);
    await this.driver.wait(until.elementIsVisible(el), timeout);
    return el;
  }

  async type(locator, value) {
    const el = await this.waitVisible(locator);
    await el.clear();
    await el.sendKeys(value);
  }
}
