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


const useExpenseStore = create<ExpenseState>()((set) => ({
  selectedDate: "2026-02",
  updateDate: (selectedDate) => set(() => ({selectedDate}))
}))


export { useBearStore, useExpenseStore};
