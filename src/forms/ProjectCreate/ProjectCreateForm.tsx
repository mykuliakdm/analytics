'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/forms/ProjectCreate/schema'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type Inputs = {
  name: string
  url: string
}

const ProjectCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axios.post('/api/project/create', { ...data }).then((response) => {
      console.log('Project created successfully, response: ', response)
    })
  }

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        New project
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Project name</Label>
          <Input {...register('name')} id="name" autoComplete="new-name" />
          {errors.name?.message ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.name.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="url">Web site URL</Label>
          <Input {...register('url')} id="url" autoComplete="new-url" />
          {errors.url?.message ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.url.message}
            </p>
          ) : null}
        </div>
        <Button type="submit">Create project</Button>
      </form>
    </>
  )
}

export default ProjectCreateForm
