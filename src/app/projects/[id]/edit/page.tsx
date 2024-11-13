import FormLayout from '@/components/FormLayout/FormLayout'
import ProjectCreateForm from '@/forms/ProjectCreate/ProjectCreateForm'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import db from '@/utils/db'
import Project from '../../../../../models/Project'

export default async function ProjectEdit({
  params: { id },
}: {
  params: { id: string }
}) {
  await db.connect()
  const project = await Project.findOne({ _id: id })
  // TODO: fix cache
  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/projects">Projects</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <FormLayout>
        <ProjectCreateForm
          title="Edit project"
          data={JSON.stringify(project)}
        />
      </FormLayout>
    </>
  )
}
