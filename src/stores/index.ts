import create from "zustand";

interface State {
  dates: Date[];
  setSelectedDates: (newDate: Date[]) => void;
}

export const useStore = create<State>((set) => ({
  dates: [] as Date[],
  setSelectedDates: (newDates: Date[]) => set((state) => ({ dates: newDates })),
}));
