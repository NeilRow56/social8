import Credentials from 'next-auth/providers/credentials'

import { getUserByEmail } from './data/user'
import type { NextAuthConfig } from 'next-auth'
import bcrypt from 'bcryptjs'
import { LoginSchema } from './validation/auth'

export default {
  providers: [
    Credentials({
      async authorize(credentials: any) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) {
            return null
          }

          const passwordMatch = await bcrypt.compare(password, user.password)
          console.log(passwordMatch)

          if (passwordMatch) return user
        }
        return null
      }
    })
  ]
} satisfies NextAuthConfig
