import chrome from "selenium-webdriver/chrome";
import { Builder } from "selenium-webdriver";

export async function buildDriver() {
  const options = new chrome.Options();
  // Comment out for headed mode
  options.addArguments("--headless=new");
  options.addArguments("--window-size=1400,900");
  options.addArguments("--no-sandbox");

  return new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
}
