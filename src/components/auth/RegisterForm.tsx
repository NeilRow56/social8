'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardWrapper } from '../CardWrapper'
import { RegisterSchema } from '@/validation/auth'
import { FormError } from './FormError'
import { FormSuccess } from './FormSuccess'
import { register } from '@/actions/register'

interface RegisterFormProps {
  callbackUrl?: string
}

export const RegisterForm = ({ callbackUrl }: RegisterFormProps) => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true)
    register(data).then(res => {
      if (res.error) {
        setLoading(false)
        setError(res.error)
        setSuccess('')
      }
      if (res.success) {
        setLoading(false)
        setError('')
        setSuccess(res.success)
      }
    })
    setLoading(false)
  }

  return (
    <CardWrapper
      headerLabel='Create an account'
      headerTitle='Register'
      backButtonLabel='Already have an account?'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex w-full'>First name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Name'
                      type='text'
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex w-full'>Last name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Last name'
                      type='text'
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex w-full'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='john.doe@example.com'
                      type='email'
                      disabled={isLoading}
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
                  <FormLabel className='flex w-full'>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='********'
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex w-full'>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='********'
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4' /> Processing
              </>
            ) : (
              <>
                <LogIn className='mr-2 h-4 w-4' /> Register
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
