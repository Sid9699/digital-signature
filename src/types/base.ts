import { z } from "zod";

// BaseSchema
export const BaseSchema = z.object({
  uuid: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  deleted_at: z.string().optional(),
  is_deleted: z.boolean().optional(),
  created_by: z.string().optional(),
  updated_by: z.string().optional(),
  deleted_by: z.string().optional(),
});

export type BaseSchemaType = z.infer<typeof BaseSchema>;

export type DataResponseType<T> = {
  status: number;
  message: string;
  data: T;
};
