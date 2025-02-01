import { z } from "zod";

import {
  invalidFormat,
  long,
  short
} from "@/common/constants/validation-errors.constants";

export const signInSchema = z.object({
  email: z.string().email(invalidFormat).max(255, long(255)),
  password: z.string().min(6, short(6)).max(25, long(25))
});
