'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/forms/SIgnUpForm/schema'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Label } from '@/components/ui/label'

type Inputs = {
  email: string
  name: string
  password: string
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post('/api/registration', { ...data }).then((response) => {
        console.log('response', response)
      })
    } catch (error) {
      console.error(`Error on registration - ${error}`)
    }
  }
  // TODO: detect fetch error
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input {...register('email')} id="email" autoComplete="new-email" />
          {errors.email?.message ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input {...register('name')} id="name" autoComplete="new-name" />
          {errors.name?.message ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register('password')}
            id="password"
            autoComplete="new-password"
            type="password"
          />
          {errors.password?.message ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.password.message}
            </p>
          ) : null}
        </div>
        <Button type="submit">Sign up</Button>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </>
  )
}

export default SignUpForm
