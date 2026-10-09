import { listInvoices } from "../invoices/list.js";

const COLUMNS = ["id", "status", "amount", "date"];

function escapeField(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\r") || str.includes("\n")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export function invoicesToCsv(invoices) {
  const header = COLUMNS.join(",") + "\r\n";
  const rows = invoices.map(
    (inv) => COLUMNS.map((col) => escapeField(inv[col])).join(",") + "\r\n"
  );
  return header + rows.join("");
}

export function exportInvoicesCsv(invoices, filter = {}) {
  const selected = listInvoices(invoices, filter);
  const content = invoicesToCsv(selected);
  return { filename: "invoices.csv", mimeType: "text/csv;charset=utf-8", content };
}
