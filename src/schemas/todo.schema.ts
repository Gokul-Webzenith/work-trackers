
import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  status: z.enum(["progress", "done"]),
  text: z.string().min(1, "Text is required"),
  date: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"), 
});

export type TodoItem = z.infer<typeof todoSchema>;
