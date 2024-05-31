export type Expense = {
    id: string, 
    expenseName: string, 
    amount: number, 
    category: CategoriesType['id'], 
    date: Value
}

export type DraftExpense = Omit<Expense, 'id'>

export type CategoriesType = {
    id: string, 
    name: string, 
    icon: string
}

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];