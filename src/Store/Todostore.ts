import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todoSchema, type TodoItem } from "@/schemas/todo.schema";

type TodoStore = {
  items: TodoItem[];

  addItem: (data: Omit<TodoItem, "id">) => {
    success: boolean;
    error?: string;
  };

  updateStatus: (id: number, status: "progress" | "done") => void;

  clearAll: () => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set,_get ) => ({
      items: [],

      addItem: (data) => {
        try {
          const newItem: TodoItem = {
            id: Date.now(), 
            ...data,
          };

         
          todoSchema.parse(newItem);

          set((state) => ({
            items: [...state.items, newItem],
          }));

          return { success: true };
        } catch (err: any) {
          return {
            success: false,
            error: err?.errors?.[0]?.message 
          };
        }
      },

      updateStatus: (id, status) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, status } : item
          ),
        }));
      },

      clearAll: () => set({ items: [] }),
    }),
    {
      name: "todo-storage", 
    }
  )
);
