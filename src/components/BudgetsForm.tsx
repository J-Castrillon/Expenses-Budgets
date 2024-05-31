import {
  ChangeEvent,
  FormEvent, useMemo,
  useState
} from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetsForm = () => {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      budget,
    };
    dispatch({
      type: "add-budget",
      payload,
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir presupuesto
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Define tu presupuesto"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue:700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
        disabled={isValid}
      >
        Guardar y continuar
      </button>
    </form>
  );
};
