import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todoSchema, type Todo } from "./../schemas/check.schema";

type TodoStore = {
  todos: Todo[];
  add: (value: string) => void;
  del: (id: number) => void;
  toggle: (id: number) => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      add: (value) =>
        set((state) => {
          const todo = {
            id: state.todos.length + 1,
            text: value,
            done: false,
          };

          const result = todoSchema.safeParse(todo);

          if (!result.success) {
            console.log(result.error.format());
            alert("wrong inputs");
            return state;
          }

          return {
            todos: [...state.todos, result.data],
          };
        }),

      del: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      toggle: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
    }),
    {
      name: "todo-ui-storage", 
      partialize: (state) => ({
        todos: state.todos, 
      }),
    }
  )
);
