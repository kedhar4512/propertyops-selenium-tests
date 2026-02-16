import assert from "node:assert/strict";
import { buildDriver } from "../src/driver.js";
import { TenantsPage } from "../src/pages/TenantsPage.js";
import { UnitsPage } from "../src/pages/UnitsPage.js";
import { RequestsPage } from "../src/pages/RequestsPage.js";
import { PaymentsPage } from "../src/pages/PaymentsPage.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

function uniq(prefix) {
  const n = Math.floor(Math.random() * 1e9);
  return `${prefix}-${n}`;
}

describe("PropertyOps E2E", function () {
  let driver;

  before(async function () {
    driver = await buildDriver();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("creates a tenant", async function () {
    const tenants = new TenantsPage(driver, BASE_URL);
    await tenants.go();

    const email = `${uniq("tenant")}@example.com`;
    await tenants.createTenant({ firstName: "Test", lastName: "User", email });

    // reload by navigating again (simple sanity step)
    await tenants.go();
    const ok = await tenants.hasTenant(email);
    assert.equal(ok, true);
  });

  it("creates a unit", async function () {
    const units = new UnitsPage(driver, BASE_URL);
    await units.go();

    const property = "Cedar View";
    const unitNumber = uniq("9A");
    await units.createUnit({ property, unitNumber });

    await units.go();
    const ok = await units.hasUnit(property, unitNumber);
    assert.equal(ok, true);
  });

  it("creates a maintenance request and updates status", async function () {
    const tenants = new TenantsPage(driver, BASE_URL);
    const units = new UnitsPage(driver, BASE_URL);
    const requests = new RequestsPage(driver, BASE_URL);

    // Ensure at least one tenant + unit exist (use seeded items)
    await requests.go();

    const title = uniq("Dishwasher leaking");
    await requests.createRequest({
      tenantLabel: "Ava Patel",
      unitLabel: "Maple Grove 2B",
      title
    });

    await requests.go();
    await requests.setInProgressFor(title);
    const status = await requests.statusFor(title);
    assert.equal(status, "in_progress");
  });

  it("records a payment", async function () {
    const payments = new PaymentsPage(driver, BASE_URL);
    await payments.go();

    const amount = 199900;
    await payments.recordPayment({
      tenantLabel: "Ava Patel",
      unitLabel: "Maple Grove 2B",
      amountCents: amount
    });

    await payments.go();
    const ok = await payments.hasAmount(amount);
    assert.equal(ok, true);
  });
});
