import * as z from "zod"

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string()
})

const loginSchema = z.object({
  email : z.string().min(5).max(40),
  password : z.string().min(4).max(20)
})

const contentSchema = z.object({
  title : z.string().min(0).max(40),
  description : z.string().min(4).max(200).optional(),
  completed : z.boolean().optional()
})

export {registerSchema, loginSchema, contentSchema};