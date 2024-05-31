import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import {
  BudgetActions,
  BudgetReducer,
  BudgetState,
  InitialState,
} from "../reducers/budget-reducer";
import { Expense } from "../types";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: () => number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

// Primera solucion al error de los parametros del contexto;
// export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

// Segunda solucion;
export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(BudgetReducer, InitialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total:number, expense:Expense) => total + expense.amount, 0),
    [state.expenses]
  );
  const remainingBudget = () => state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
