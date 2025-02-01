import {
  invalidFormat,
  long,
  short
} from "@/common/constants/validation-errors.constants";
import { z } from "zod";

export const updateUserSchema = z.object({
  avatar: z.instanceof(File).nullable(),
  name: z.string().min(1, short(1)).max(255, long(255)),
  surname: z.string().min(1, short(1)).max(255, long(255)),
  email: z.string().email(invalidFormat).max(255, long(255))
});
