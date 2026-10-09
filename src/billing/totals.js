/**
 * Compute the total amount for a list of invoices.
 * @param {Array<{amount: number}>} invoices
 * @returns {number}
 */
export function computeTotals(invoices) {
  return invoices.reduce((sum, inv) => sum + inv.amount, 0);
}

export function computeAverage(invoices) {
  if (invoices.length === 0) return 0;
  return computeTotals(invoices) / invoices.length;
}
