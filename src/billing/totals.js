/**
 * Compute the total amount for a list of invoices.
 * @param {Array<{amount: number}>} invoices
 * @returns {number}
 */
export function computeTotals(invoices) {
  return invoices.reduce((sum, inv) => sum + inv.amount, 0);
}
