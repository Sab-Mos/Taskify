import { z } from "zod";

export const userSchema = z.object({
  body: z.string(),
  id: z.string().uuid(),
  isComplete: z.boolean(),
  isEdited: z.boolean(),
});

export type Todo = z.infer<typeof userSchema>;
