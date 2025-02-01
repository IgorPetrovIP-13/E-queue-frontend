import { invalidFormat, long, requiredField, short } from "@/common/constants/validation-errors.constants";
import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1,  requiredField)
      .max(255, long(255)),
    surname: z
      .string()
      .min(1, requiredField)
      .max(255, long(255)),
    email: z
      .string()
      .email(invalidFormat)
      .max(255, long(255)),
    password: z
      .string()
      .min(6, short(6))
      .max(25, long(25)),
    confirmPassword: z
      .string()
      .min(6, short(6))
      .max(25, long(25))
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Паролі не співпадають"
      });
    }
  });
