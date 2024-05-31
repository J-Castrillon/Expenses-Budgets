import { categories } from "../data/categories";
import {
  AdjustmentsHorizontalIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useBudget } from "../hooks/useBudget";
import { ChangeEvent } from "react";

export const FilterByCategory = () => {
  const { state, dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const payload = {
      id: e.target.value,
    };

    dispatch({
      type: "add-filter-category",
      payload,
    });
  };

  const HandleClearFilter = () => {
    dispatch({
      type: "clear-filter",
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">
            <AdjustmentsHorizontalIcon className="w-8 h-8 text-gray-600" />
          </label>
          <select
            name="category"
            id="category"
            className="bg-slate-100 p-3 flex-1 rounded"
            onChange={handleChange}
          >
            <option value="">Filtrar por categoría de gastos</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          {state.categoryId && (
            <span className="cursor-pointer" onClick={HandleClearFilter}>
              <XCircleIcon className=" text-red-500 w-7 h-7" />
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
