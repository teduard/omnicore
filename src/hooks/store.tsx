// store.ts
import { create } from 'zustand'

// Define types for state & actions
interface BearState {
  bears: number
  food: string
  feed: (food: string) => void,
  increase: (by:number) => void,
}

interface ExpenseState {
  selectedDate: string,
  updateDate: (newDate:string) => void,
}

// Create store using the curried form of `create`
const useBearStore = create<BearState>()((set) => ({
  bears: 2,
  food: 'honey',
  feed: (food) => set(() => ({ food })),
  increase: (by:number) => set((s) => ({ bears: s.bears + by })),
}))


const useExpenseStore = create<ExpenseState>()((set) => {

  const curDate = new Date();
  const year = '' + curDate.getFullYear();
  let month = '' + (curDate.getMonth()+1);

  month = (month.length < 2 ) ? "0" + month : month;

  return {
    selectedDate: `${year}-${month}`, //"2026-02",
    updateDate: (selectedDate) => set(() => ({selectedDate}))
    };
  }
  );


export { useBearStore, useExpenseStore};
