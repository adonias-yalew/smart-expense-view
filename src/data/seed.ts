import type { Transaction, Category } from "@/store/expenseStore";

export const defaultCategories: Category[] = [
  { id: "food", name: "Food", color: "#f97316", icon: "UtensilsCrossed" },
  { id: "transport", name: "Transport", color: "#3b82f6", icon: "Car" },
  { id: "bills", name: "Bills", color: "#ef4444", icon: "Receipt" },
  { id: "shopping", name: "Shopping", color: "#a855f7", icon: "ShoppingBag" },
  { id: "entertainment", name: "Entertainment", color: "#ec4899", icon: "Film" },
  { id: "health", name: "Health", color: "#10b981", icon: "HeartPulse" },
  { id: "salary", name: "Salary", color: "#22c55e", icon: "Wallet" },
  { id: "other", name: "Other", color: "#64748b", icon: "Tag" },
];

const today = new Date();
const d = (offset: number) => {
  const x = new Date(today);
  x.setDate(x.getDate() - offset);
  return x.toISOString().slice(0, 10);
};

export const seedTransactions: Transaction[] = [
  { id: "t1", title: "Monthly Salary", amount: 5200, type: "income", categoryId: "salary", date: d(2) },
  { id: "t2", title: "Whole Foods Market", amount: 86.42, type: "expense", categoryId: "food", date: d(1) },
  { id: "t3", title: "Uber to Airport", amount: 34.5, type: "expense", categoryId: "transport", date: d(3) },
  { id: "t4", title: "Electricity Bill", amount: 124.0, type: "expense", categoryId: "bills", date: d(5) },
  { id: "t5", title: "Netflix Subscription", amount: 15.99, type: "expense", categoryId: "entertainment", date: d(6) },
  { id: "t6", title: "Nike Sneakers", amount: 129.99, type: "expense", categoryId: "shopping", date: d(8) },
  { id: "t7", title: "Pharmacy", amount: 22.3, type: "expense", categoryId: "health", date: d(10) },
  { id: "t8", title: "Freelance Project", amount: 850, type: "income", categoryId: "salary", date: d(12) },
  { id: "t9", title: "Restaurant Dinner", amount: 64.2, type: "expense", categoryId: "food", date: d(14) },
  { id: "t10", title: "Gas Station", amount: 48.0, type: "expense", categoryId: "transport", date: d(16) },
  { id: "t11", title: "Internet Bill", amount: 59.99, type: "expense", categoryId: "bills", date: d(20) },
  { id: "t12", title: "Concert Tickets", amount: 180, type: "expense", categoryId: "entertainment", date: d(25) },
  { id: "t13", title: "Coffee Beans", amount: 18.5, type: "expense", categoryId: "food", date: d(35) },
  { id: "t14", title: "Gym Membership", amount: 45, type: "expense", categoryId: "health", date: d(40) },
  { id: "t15", title: "Bonus", amount: 1200, type: "income", categoryId: "salary", date: d(45) },
];