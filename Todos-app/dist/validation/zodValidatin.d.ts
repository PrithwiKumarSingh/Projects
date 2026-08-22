import * as z from "zod";
declare const registerSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
}, z.core.$strip>;
declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
declare const contentSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    completed: z.ZodBoolean;
}, z.core.$strip>;
export { registerSchema, loginSchema, contentSchema };
//# sourceMappingURL=zodValidatin.d.ts.map