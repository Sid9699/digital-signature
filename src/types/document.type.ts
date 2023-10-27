import { z } from "zod";

import { BaseSchema } from "./base";

// Document
export const Document = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  doc: z.string().optional(),
  signature: z.string().optional(),
  signedDoc: z.string().optional(),
});

export const zDocument = Document.merge(BaseSchema);
export type DocumentType = z.infer<typeof zDocument>;
