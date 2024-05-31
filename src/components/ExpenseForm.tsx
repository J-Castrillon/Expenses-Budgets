import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");
  const [prevAmount, setPrevAmount] = useState(0);
  const { state, dispatch, remainingBudget } = useBudget();

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(editingExpense);
      setPrevAmount(editingExpense.amount);
    }
  }, [state.editingId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleDateChange = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if((expense.amount - prevAmount) > remainingBudget()){
      setError("El gasto se sale del presupuesto"); 
      return;
    }

    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({
        type: "add-expense",
        payload: { expense },
      });
    }

    setExpense({
      expenseName: "",
      amount: 0,
      category: "",
      date: new Date(),
    });
    setPrevAmount(0);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl border-b-2 border-slate-100 font-black">
        {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label className="text-xl ml-2" htmlFor="expenseName">
          Nombre Gasto:
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          placeholder="Indique el nombre del gasto"
          className="bg-slate-100 p-2 rounded-md"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl ml-2" htmlFor="amount">
          Cantidad:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Agregue la cantidad del gasto: ejemplo: 300"
          className="bg-slate-100 p-2 rounded-md"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl ml-2" htmlFor="amount">
          Categoría:
        </label>

        <select
          name="category"
          id="category"
          aria-placeholder="Seleccione la categoria"
          className="bg-slate-100 p-2 rounded-md"
          value={expense.category}
          onChange={handleChange}
        >
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl ml-2" htmlFor="amount">
          Fecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100 p-2 rounded-md"
          value={expense.date}
          onChange={handleDateChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      >
        {state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
      </button>
    </form>
  );
};
