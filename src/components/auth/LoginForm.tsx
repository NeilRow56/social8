'use client'

import React, { useState, useTransition } from 'react'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import Link from 'next/link'
import { loginUser } from '@/actions/login'
import { LoginSchema } from '@/validation/auth'
import { CardWrapper } from '../CardWrapper'
import { FormError } from './FormError'
import { FormSuccess } from './FormSuccess'
import { Loader2, LogIn } from 'lucide-react'

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      loginUser(data, '')
        .then(data => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }
          if (data?.success) {
            form.reset()
            setSuccess(data.success)
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }

  return (
    <CardWrapper
      headerLabel='Welcome back'
      headerTitle='Login'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type='email'
                      placeholder='johndoe@example.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type='password'
                      placeholder='********'
                    />
                  </FormControl>
                  {/* <Button variant="link" size="sm" asChild>
                    <Link href="/auth/reset" className="px-0 font-normal">
                      Forgot password?
                    </Link>
                  </Button> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4' /> Processing
              </>
            ) : (
              <>
                <LogIn className='mr-2 h-4 w-4' /> Login
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
