import { z } from "zod";

export const calculateSchema = {
  operation: z.enum(["add", "subtract", "multiply", "divide"]),
  a: z.number(),
  b: z.number(),
};

export async function calculateHandler({ operation, a, b }) {
  const results = {
    add: a + b,
    subtract: a - b,
    multiply: a * b,
    divide: a / b,
  };

  return {
    content: [{ type: "text", text: `Result: ${results[operation]}` }],
  };
}
