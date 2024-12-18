import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Valid email is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters' })
      .max(45, { message: 'Last name must be less than 45 characters' })
      .regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    lastName: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(45, { message: 'Name must be less than 45 characters' })
      .regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    email: z.string().email({
      message: 'Valid email is required'
    }),

    password: z
      .string()
      .min(6, {
        message: 'Minimum 6 characters required'
      })
      .max(50, 'Password must be less than 50 characters'),

    confirmPassword: z
      .string()
      .min(6, {
        message: 'Minimum 6 characters required'
      })
      .max(50, 'Password must be less than 50 characters')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ['confirmPassword']
  })
