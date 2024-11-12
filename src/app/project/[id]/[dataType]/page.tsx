import ProjectData from '@/components/ProjectData/ProjectData'
import ProjectNavigation from '@/components/ProjectNavigation/ProjectNavigation'
import { dataTypeProps, IProjectNav } from '@/utils/types'
import { Eye, Mouse, Footprints, TrafficCone } from 'lucide-react'
import Analytics from '@/components/Analytics/Analytics'
import Project from '../../../../../models/Projects'
import db from '@/utils/db'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

const nav = {
  visits: {
    slug: 'visits',
    label: 'Visits',
    icon: <Eye />,
  },
  events: {
    slug: 'events',
    label: 'Events',
    icon: <Mouse />,
  },
  navigation: {
    slug: 'navigation',
    label: 'Navigation',
    icon: <Footprints />,
  },
  traffic: {
    slug: 'traffic',
    label: 'Traffic',
    icon: <TrafficCone />,
  },
} as { [key: string]: IProjectNav }

export default async function ProjectPage({
  params: { id, dataType },
}: {
  params: {
    id: string
    dataType: dataTypeProps
  }
}) {
  await db.connect()
  const project = await Project.findOne({ _id: id })
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
            <BreadcrumbPage>{project.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProjectData project={JSON.stringify(project)} />
      <ProjectNavigation nav={nav} projectId={id} />
      <Analytics dataType={dataType} />
    </>
  )
}
