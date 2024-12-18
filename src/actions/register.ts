'use server'

import { RegisterSchema } from '@/validation/auth'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.parse(data)

    if (!validatedData) {
      return { error: 'Invalid input data' }
    }

    const { firstName, lastName, email, password, confirmPassword } =
      validatedData

    if (password !== confirmPassword) {
      return { error: 'Passwords do not match' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userExists = await db.user.findFirst({
      where: {
        email: data.email
      }
    })

    if (userExists) {
      return { error: 'User already exists' }
    }

    const lowerCaseEmail = email.toLocaleLowerCase()

    const user = await db.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: lowerCaseEmail,
        password: hashedPassword
      }
    })

    return { success: 'User created successfully' }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred whilst creating user' }
  }
}
