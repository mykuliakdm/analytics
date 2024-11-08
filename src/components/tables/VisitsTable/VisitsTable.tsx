import { IVisit } from '@/utils/types'
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
  Link as LinkIcon,
  Monitor,
  Timer,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getDate } from '@/utils/string/getDate'
import VisitDuration from '@/components/VisitDuration/VisitDuration'

type VisitsTableProps = {
  data: IVisit[]
}

const VisitsTable = ({ data }: VisitsTableProps) => {
  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <LinkIcon className="w-4 h-4" />
                Page URL
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Calendar className="w-4 h-4" />
                Date/Time start
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Timer className="w-4 h-4" />
                Time spent
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Monitor className="w-4 h-4" />
                Screen size
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Compass className="w-4 h-4" />
                Browser
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((visit, index) => (
            <TableRow key={visit._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{visit.ip}</TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="whitespace-nowrap max-w-32 overflow-hidden overflow-ellipsis inline-block">
                      {visit.href}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col">
                      <div className="inline-flex gap-x-1">
                        <span className="font-medium">Full URL:</span>{' '}
                        <span className="text-gray-700">{visit.href}</span>
                      </div>
                      {visit.pageTitle ? (
                        <div className="inline-flex gap-x-1">
                          <span className="font-medium">Page:</span>{' '}
                          <span className="text-gray-700">
                            {visit.pageTitle}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{getDate(visit.timestamp)}</TableCell>
              <TableCell>
                <VisitDuration time={visit.time} />
              </TableCell>
              <TableCell>{visit.screenSize}</TableCell>
              <TableCell>
                <Tooltip>
                  <div className="inline-flex">
                    <TooltipTrigger>
                      <Info className="w-4 h-4 mr-2" />
                    </TooltipTrigger>
                    <span className="whitespace-nowrap max-w-32 overflow-hidden overflow-ellipsis inline-block">
                      {visit.userAgent}
                    </span>
                  </div>
                  <TooltipContent>
                    <span className="font-medium">Full info:</span>{' '}
                    <span className="text-gray-700">{visit.userAgent}</span>
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

export default VisitsTable
