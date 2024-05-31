import { useMemo } from "react";
import { formatDate } from "../helpers/formatCurrency";
import { Expense } from "../types";
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../data/categories";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category),
    [expense]
  )[0];

  const { dispatch } = useBudget();

  // Izquierda;
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({
            type: "get-expense-by-id",
            payload: { id: expense.id },
          })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  // Derecha;
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          dispatch({ type: "remove-expense", payload: { id: expense.id } })
        }
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-8 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="Icono gasto"
              className="w-14"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm text-slate-500 font-bold uppercase">
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
