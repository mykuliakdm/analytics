import { IEvent } from '@/utils/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Calendar,
  Compass,
  Info,
  Milestone,
  Monitor,
  MoveRight,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getDate } from '@/utils/string/getDate'

type NavigationTableProps = {
  data: IEvent[]
}

const NavigationTable = ({ data }: NavigationTableProps) => {
  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Milestone className="w-4 h-4 min-w-4" />
                From
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Milestone className="w-4 h-4 min-w-4" />
                To
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Calendar className="w-4 h-4 min-w-4" />
                Date/Time
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Monitor className="w-4 h-4 min-w-4" />
                Screen size
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Compass className="w-4 h-4 min-w-4" />
                Browser
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((nav, index) => (
            <TableRow key={nav._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{nav.ip}</TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="whitespace-nowrap max-w-32 overflow-hidden overflow-ellipsis inline-block">
                      {nav.currentHref}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col">
                      <div className="inline-flex gap-x-1">
                        <span className="font-medium">Full URL:</span>{' '}
                        <span className="text-gray-700">{nav.currentHref}</span>
                      </div>
                      {nav.pageTitle ? (
                        <div className="inline-flex gap-x-1">
                          <span className="font-medium">Page:</span>{' '}
                          <span className="text-gray-700">{nav.pageTitle}</span>
                        </div>
                      ) : null}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip>
                  <div className="inline-flex">
                    {nav.details.newHref.length >= 20 ? (
                      <TooltipTrigger>
                        <Info className="w-4 h-4 mr-2" />
                      </TooltipTrigger>
                    ) : null}
                    <span className="whitespace-nowrap max-w-32 overflow-hidden overflow-ellipsis inline-block">
                      {nav.details.newHref}
                    </span>
                  </div>
                  <TooltipContent>
                    <span className="font-medium">Full URL:</span>{' '}
                    <span className="text-gray-700">{nav.details.newHref}</span>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{getDate(nav.timestamp)}</TableCell>
              <TableCell>{nav.screenSize}</TableCell>
              <TableCell>
                <Tooltip>
                  <div className="inline-flex">
                    <TooltipTrigger>
                      <Info className="w-4 h-4 mr-2" />
                    </TooltipTrigger>
                    <span className="whitespace-nowrap max-w-32 overflow-hidden overflow-ellipsis inline-block">
                      {nav.userAgent}
                    </span>
                  </div>
                  <TooltipContent>
                    <span className="font-medium">Full info:</span>{' '}
                    <span className="text-gray-700">{nav.userAgent}</span>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  )
}

export default NavigationTable
