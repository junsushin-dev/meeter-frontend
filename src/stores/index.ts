import create from "zustand";

interface State {
  dates: Date[];
  title: string;
  description: string;
  setSelectedDates: (newDate: Date[]) => void;
  setTitle: (newTitle: string) => void;
  setDescription: (newDescription: string) => void;
}

export const useStore = create<State>((set) => ({
  dates: [] as Date[],
  title: "",
  description: "",
  setSelectedDates: (newDates: Date[]) => set((state) => ({ dates: newDates })),
  setTitle: (newTitle: string) => set((state) => ({ title: newTitle })),
  setDescription: (newDescription: string) =>
    set((state) => ({ description: newDescription })),
}));
