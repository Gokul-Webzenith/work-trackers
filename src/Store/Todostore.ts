import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todoSchema, type TodoItem } from "@/schemas/todo.schema";

type TodoStore = {
  items: TodoItem[];
  addItem: (data: Omit<TodoItem, "id">) => { success: boolean; error?: string };
  clearAll: () => void;
  updateStatus: (id: number, status: "progress" | "done") => void;

};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (data) => {
        const fullData: TodoItem = {
          ...data,
          id: Date.now(),
        };

        const result = todoSchema.safeParse(fullData);

        if (!result.success) {
          return {
            success: false,
            error: result.error.issues[0].message,
          };
        }

        set((state) => ({
          items: [...state.items, result.data],
        }));

        return { success: true };
      },
      updateStatus: (id, status) =>
  set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, status } : item
    ),
  })),


      clearAll: () => set({ items: [] }),
    }),
    {
      name: "todo-storage",
      partialize: (state) => ({
        items: state.items,  
      }),
    }
  )
);
