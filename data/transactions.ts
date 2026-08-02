/**
 * @format
 */

export type Transaction = {
  id: string;
  merchant: string;
  category: string;
  amount: number; // positive = income, negative = expense
  date: string; // ISO date, YYYY-MM-DD
};

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

export const transactions: Transaction[] = [
  { id: '1', merchant: 'Acme Corp Payroll', category: 'Salary', amount: 3200, date: daysAgo(2) },
  { id: '2', merchant: 'Whole Foods', category: 'Groceries', amount: -84.32, date: daysAgo(1) },
  { id: '3', merchant: 'Riverside Apartments', category: 'Rent', amount: -1450, date: daysAgo(3) },
  { id: '4', merchant: 'Uber', category: 'Transport', amount: -18.5, date: daysAgo(3) },
  { id: '5', merchant: 'Netflix', category: 'Entertainment', amount: -15.99, date: daysAgo(4) },
  { id: '6', merchant: 'Pacific Gas & Electric', category: 'Utilities', amount: -96.4, date: daysAgo(5) },
  { id: '7', merchant: 'Chipotle', category: 'Dining', amount: -12.75, date: daysAgo(6) },
  { id: '8', merchant: 'Trader Joe’s', category: 'Groceries', amount: -46.18, date: daysAgo(7) },
  { id: '9', merchant: 'Spotify', category: 'Entertainment', amount: -10.99, date: daysAgo(9) },
  { id: '10', merchant: 'Shell', category: 'Transport', amount: -41.2, date: daysAgo(10) },
  { id: '11', merchant: 'Freelance Invoice', category: 'Salary', amount: 450, date: daysAgo(11) },
  { id: '12', merchant: 'AT&T', category: 'Utilities', amount: -70, date: daysAgo(13) },
  { id: '13', merchant: 'Blue Bottle Coffee', category: 'Dining', amount: -6.5, date: daysAgo(14) },
  { id: '14', merchant: 'Target', category: 'Shopping', amount: -63.9, date: daysAgo(16) },
  { id: '15', merchant: 'Gym Membership', category: 'Health', amount: -45, date: daysAgo(20) },
];

export function getBalance(list: Transaction[] = transactions): number {
  return list.reduce((sum, t) => sum + t.amount, 0);
}

export function getIncomeTotal(list: Transaction[] = transactions): number {
  return list
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getExpenseTotal(list: Transaction[] = transactions): number {
  return list
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getSortedByDateDesc(
  list: Transaction[] = transactions,
): Transaction[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'always',
  }).format(amount);
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoDate));
}
