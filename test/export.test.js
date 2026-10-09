import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { invoicesToCsv, exportInvoicesCsv } from "../src/export/invoices-csv.js";

const SAMPLE = [
  { id: "INV-001", status: "paid", amount: 100, date: "2026-01-15" },
  { id: "INV-002", status: "unpaid", amount: 250, date: "2026-02-20" },
  { id: "INV-003", status: "paid", amount: 75, date: "2026-03-10" },
];

describe("exportInvoicesCsv", () => {
  it("exports all invoices when no filter is given", () => {
    const result = exportInvoicesCsv(SAMPLE);
    assert.equal(result.filename, "invoices.csv");
    assert.equal(result.mimeType, "text/csv;charset=utf-8");
    const lines = result.content.split("\r\n").filter((l) => l);
    assert.equal(lines.length, 4); // header + 3 rows
  });

  it("exports only paid invoices when filtered", () => {
    const result = exportInvoicesCsv(SAMPLE, { status: "paid" });
    const lines = result.content.split("\r\n").filter((l) => l);
    assert.equal(lines.length, 3); // header + 2 rows
    assert.ok(lines[1].startsWith("INV-001"));
    assert.ok(lines[2].startsWith("INV-003"));
  });

  it("exports header only when no invoices match", () => {
    const result = exportInvoicesCsv(SAMPLE, { status: "overdue" });
    assert.equal(result.content, "id,status,amount,date\r\n");
  });
});

describe("invoicesToCsv", () => {
  it("escapes fields with commas", () => {
    const csv = invoicesToCsv([{ id: "a,b", status: "x", amount: 1, date: "d" }]);
    assert.ok(csv.includes('"a,b"'));
  });

  it("escapes fields with quotes", () => {
    const csv = invoicesToCsv([{ id: 'a"b', status: "x", amount: 1, date: "d" }]);
    assert.ok(csv.includes('"a""b"'));
  });
});
