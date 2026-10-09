import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { listInvoices } from "../src/invoices/list.js";

const SAMPLE = [
  { id: "INV-001", status: "paid", amount: 100, date: "2026-01-15" },
  { id: "INV-002", status: "unpaid", amount: 250, date: "2026-02-20" },
  { id: "INV-003", status: "paid", amount: 75, date: "2026-03-10" },
];

describe("listInvoices", () => {
  it("returns all invoices when no filter is given", () => {
    const result = listInvoices(SAMPLE);
    assert.equal(result.length, 3);
  });

  it("filters by status", () => {
    const result = listInvoices(SAMPLE, { status: "paid" });
    assert.equal(result.length, 2);
    assert.ok(result.every((inv) => inv.status === "paid"));
  });

  it("returns empty array when no invoices match", () => {
    const result = listInvoices(SAMPLE, { status: "overdue" });
    assert.equal(result.length, 0);
  });
});
