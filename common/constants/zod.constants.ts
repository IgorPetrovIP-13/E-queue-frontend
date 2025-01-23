import { z } from "zod";

import {
  invalidFormat,
  long,
  requiredField,
  short,
  urlRequired
} from "./validation-errors.constants";

export const zodObjectId = z.union([
  z.null().refine(() => false, {
    message: requiredField
  }),
  z.string().regex(/^[0-9A-Fa-f]{24}$/, {
    message: invalidFormat
  })
]);

export function zodOptionalString(minLength: number, maxLength: number) {
  return z.union([
    z.literal(""),
    z.string().min(minLength, short(minLength)).max(maxLength, long(maxLength))
  ]);
}

export const zodOptionalUrl = z.union([
  z.literal(""),
  z.string().url(urlRequired)
]);

export const zodFileLinksArray = z
  .array(z.string().url(urlRequired))
  .max(10, long(10));
