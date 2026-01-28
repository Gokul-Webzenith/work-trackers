
import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  text: z.string().trim().min(2),
  done: z.boolean(),

}
);
  
export type Todo = z.infer<typeof todoSchema>;
