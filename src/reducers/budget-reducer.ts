import { v4 as uuidv4 } from "uuid";
import { CategoriesType, DraftExpense, Expense } from "../types";
import { getToLocalStorage } from "../helpers/localStorage";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "clear-app" }
  | { type: "add-filter-category"; payload: { id: CategoriesType["id"] } }
  | { type: "clear-filter" };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  categoryId: CategoriesType["id"];
};

export const InitialBudget = () => {
  const budgetStorage = getToLocalStorage("Budget");
  return budgetStorage ? +budgetStorage : 0;
};

export const InitialExpenses = (): Expense[] => {
  const expensesStorage = getToLocalStorage("Expenses");
  return expensesStorage ? expensesStorage : [];
};

export const InitialState: BudgetState = {
  budget: InitialBudget(),
  modal: false,
  expenses: InitialExpenses(),
  editingId: "",
  categoryId: "",
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const BudgetReducer = (
  state: BudgetState = InitialState,
  action: BudgetActions
) : BudgetState => {
  switch (action.type) {
    case "add-budget":
      return {
        ...state,
        budget: action.payload.budget,
      };
    case "show-modal":
      return {
        ...state,
        modal: true,
      };
    case "close-modal":
      return {
        ...state,
        modal: false,
        editingId: "",
      };
    case "add-expense":
      const expense = createExpense(action.payload.expense); // Generar el id;
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
    case "remove-expense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "get-expense-by-id":
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };
    case "update-expense":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense
        ),
        modal: false,
        editingId: "",
      };
    case "clear-app":
      return {
        budget: 0,
        modal: false,
        expenses: [],
        editingId: "",
        categoryId: "",
      };
    case "add-filter-category":
      return {
        ...state,
        categoryId: action.payload.id,
      };
    case "clear-filter":
      return {
        ...state,
        categoryId: "",
      };
  }
};
