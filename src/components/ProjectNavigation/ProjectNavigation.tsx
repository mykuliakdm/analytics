'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { IProjectNav } from '@/utils/types'

type ProjectNavigationProps = {
  projectId: string
  nav: { [key: string]: IProjectNav }
}

const ProjectNavigation = ({ projectId, nav }: ProjectNavigationProps) => {
  const pathname = usePathname()

  return (
    <>
      <div className="flex items-center justify-between bg-indigo-100 p-4 rounded-lg my-4">
        <div className="flex items-center gap-x-1 flex-wrap md:flex-nowrap">
          {Object.entries(nav).map(([key, value]) => {
            const isActive = `/project/${projectId}/${value.slug}` === pathname
            return (
              <Button
                key={key}
                asChild
                variant={isActive ? 'outline' : 'ghost'}
              >
                <Link href={`/project/${projectId}/${value.slug}`}>
                  {value.icon}
                  {value.label}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ProjectNavigation
