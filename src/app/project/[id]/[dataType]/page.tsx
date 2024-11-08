import ProjectData from '@/components/ProjectData/ProjectData'
import ProjectNavigation from '@/components/ProjectNavigation/ProjectNavigation'
import { dataTypeProps, IProjectNav } from '@/utils/types'
import { Eye, Mouse, Footprints, TrafficCone } from 'lucide-react'
import Analytics from '@/components/Analytics/Analytics'
import Project from '../../../../../models/Projects'
import db from '@/utils/db'

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
      <ProjectData project={JSON.stringify(project)} />
      <ProjectNavigation nav={nav} projectId={id} />
      <Analytics dataType={dataType} />
    </>
  )
}
