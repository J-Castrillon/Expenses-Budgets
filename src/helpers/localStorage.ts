import { Expense } from "../types";

export const saveToLocalStorage = (key: string, body: Expense[] | number) => {
  localStorage.setItem(key, typeof body === 'number' ? body.toString() : JSON.stringify(body));
};

export const getToLocalStorage = (key: string): Expense[] => {
  const storage = localStorage.getItem(key);
  try {
    if (storage) {
      return JSON.parse(storage);
    }
  } catch (error) {
      console.error("Error parsing localStorage");
      return [];
  }

  return [];
};
