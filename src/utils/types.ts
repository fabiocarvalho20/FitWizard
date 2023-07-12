import { string, z } from "zod";

const mealSchema = z.object({
  meal_content: z.string(),
  amount_of_protein: z.string(),
  amount_of_carbohydrate: z.string(),
  amount_of_fiber: z.string(),
});

export const dietSchema = z.object({
  breakfast: mealSchema,
  second: mealSchema,
  lunch: mealSchema,
  fourth: mealSchema,
  dinner: mealSchema,
  sixth: mealSchema,
  comment: z.string(),
});
