'use client'

import { useCallback } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IProject } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Trash, Eye } from 'lucide-react'

export default function ProjectsList({ data }: { data: IProject[] }) {
  const handleRemove = useCallback(() => {
    console.log('Removing project')
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0
          ? data.map((project) => (
              <TableRow key={project._id}>
                <TableCell>1</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.url}</TableCell>
                <TableCell>
                  {format(project.createdAt, 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-x-4 justify-end">
                    <Button variant="outline" asChild>
                      <Link href={`/project/${project._id}/visits`}>
                        <Eye />
                      </Link>
                    </Button>
                    <Button variant="ghost" onClick={handleRemove}>
                      <Trash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  )
}
