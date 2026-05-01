import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultCategories, seedTransactions } from "@/data/seed";

export type TxType = "income" | "expense";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TxType;
  categoryId: string;
  date: string; // YYYY-MM-DD
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

interface ExpenseState {
  transactions: Transaction[];
  categories: Category[];
  budgets: Record<string, number>; // categoryId -> monthly budget
  monthlyBudget: number;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (c: Omit<Category, "id">) => void;
  deleteCategory: (id: string) => void;
  setBudget: (categoryId: string, amount: number) => void;
  setMonthlyBudget: (amount: number) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      transactions: seedTransactions,
      categories: defaultCategories,
      budgets: { food: 400, transport: 200, bills: 300, entertainment: 150, shopping: 250 },
      monthlyBudget: 2000,
      addTransaction: (t) =>
        set((s) => ({ transactions: [{ ...t, id: uid() }, ...s.transactions] })),
      updateTransaction: (id, t) =>
        set((s) => ({
          transactions: s.transactions.map((x) => (x.id === id ? { ...t, id } : x)),
        })),
      deleteTransaction: (id) =>
        set((s) => ({ transactions: s.transactions.filter((x) => x.id !== id) })),
      addCategory: (c) =>
        set((s) => ({ categories: [...s.categories, { ...c, id: uid() }] })),
      deleteCategory: (id) =>
        set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),
      setBudget: (categoryId, amount) =>
        set((s) => ({ budgets: { ...s.budgets, [categoryId]: amount } })),
      setMonthlyBudget: (amount) => set({ monthlyBudget: amount }),
    }),
    { name: "expense-tracker-store" }
  )
);

// Selectors / helpers
export const selectTotals = (txs: Transaction[]) => {
  const income = txs.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expenses = txs.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  return { income, expenses, balance: income - expenses };
};