/**
 * Filter invoices by status.
 * @param {Array<{id: string, status: string, amount: number, date: string}>} invoices
 * @param {{ status?: string }} filter
 * @returns {Array<{id: string, status: string, amount: number, date: string}>}
 */
export function listInvoices(invoices, filter = {}) {
  let result = invoices;
  if (filter.status) {
    result = result.filter((inv) => inv.status === filter.status);
  }
  return result;
}
