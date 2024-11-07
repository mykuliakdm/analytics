import ProjectData from '@/components/ProjectData/ProjectData'
import ProjectNavigation from '@/components/ProjectNavigation/ProjectNavigation'
import { IProjectNav } from '@/utils/types'
import { Eye, Mouse, Footprints } from 'lucide-react'
import Analytics from '@/components/Analytics/Analytics'

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
} as { [key: string]: IProjectNav }

export default async function ProjectPage({
  params: { id, dataType },
}: {
  params: { id: string; dataType: 'visits' | 'events' | 'navigation' }
}) {
  return (
    <>
      <ProjectData id={id} />
      <ProjectNavigation nav={nav} projectId={id} />
      <Analytics dataType={dataType} />
    </>
  )
}
