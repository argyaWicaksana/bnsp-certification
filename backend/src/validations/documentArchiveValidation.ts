import { z } from "zod";

const MAX_BYTES = 5 * 1024 * 1024;
const PDF_MIMES = ["application/pdf", "application/x-pdf"];

export const documentArchiveSchema = z.object({
    title: z.string().min(1, "Title is required"),
    letterNo: z.string().min(1, "Letter Number is required"),
    categoryId: z.coerce.number().int().positive("Category ID must be a positive integer"),
});

export const documentArchiveSchemaPartial = documentArchiveSchema.partial();

export const pdfFileSchema = z.object({
    /** Multer fields */
    fieldname: z.string().optional(),
    originalname: z.string(),
    encoding: z.string().optional(),
    mimetype: z.string(),
    size: z.number().int().nonnegative(),
    destination: z.string().optional(),
    filename: z.string().optional(),
    path: z.string().optional(),
    buffer: z.any().optional(),
}).superRefine((file, ctx) => {
    const byMime = PDF_MIMES.includes(file.mimetype);
    const byExt = file.originalname.toLowerCase().endsWith('.pdf');

    if (!(byMime || byExt)) {
      ctx.addIssue({
        code: "custom",
        message: "Only PDF files are allowed",
      });
    }

    if (file.size > MAX_BYTES) {
      ctx.addIssue({
        code: "custom",
        message: "Max file size is 5 MB.",
      });
    }
  });

const documentArchiveSchemaWithFile = documentArchiveSchema.extend({ file: z.string() });
export type DocumentArchiveData = z.infer<typeof documentArchiveSchemaWithFile>;