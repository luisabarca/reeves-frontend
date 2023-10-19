import z from "zod";

export const formSchema = z.object({
    width: z.number({
        required_error: "Width is required",
        coerce: true,
    }),
    height: z.number({
        coerce: true,
    }).optional(),
    young: z.boolean().optional(),
    grayscale: z.boolean().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;