import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetail } from "./ExpenseDetail";

export const ExpenseList = () => {
  const { state } = useBudget();

  const filteredExpenses = state.categoryId
    ? state.expenses.filter((expense) => expense.category === state.categoryId)
    : state.expenses;
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

  return (
    <div className="mt-10 shadow-lg bg-white rounded-lg p-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No existen gastos</p>
      ) : (
        <>
          <h3 className="text-gray-600 text-2xl font-bold my-5">
            Listado de Gastos:
          </h3>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};
