import { useEffect, useMemo } from "react";
import { BudgetsForm } from "./components/BudgetsForm";
import { Header } from "./components/layout/Header";
import { useBudget } from "./hooks/useBudget";
import { BudgetTracker } from "./components/BudgetTracker";
import { ExpenseModal } from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { saveToLocalStorage } from "./helpers/localStorage";
import { FilterByCategory } from "./components/FilterByCategory";

function App() {
  const { state } = useBudget();
  useEffect(() => {
    saveToLocalStorage('Expenses', []); 
    saveToLocalStorage('Budget', 0); 
  }, []); 

  useEffect(()=> {
    saveToLocalStorage('Expenses', state.expenses); 
    saveToLocalStorage('Budget', state.budget);
  }, [state])

  const isValidBadge = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBadge ? <BudgetTracker /> : <BudgetsForm />}
      </div>

      {isValidBadge && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory/>
          <ExpenseList/>
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
