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
  Atom,
  Calendar,
  Compass,
  Image as ImageIcon,
  Info,
  Link as LinkIcon,
  Link2,
  Monitor,
  MousePointerClick,
  Pointer,
  Text as TextIcon,
  TextCursorInput,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getDate } from '@/utils/string/getDate'

type EventsTableProps = {
  data: IEvent[]
}

const EventsTable = ({ data }: EventsTableProps) => {
  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <MousePointerClick className="w-4 h-4 min-w-4" />
                Type
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <Atom className="w-4 h-4 min-w-4" />
                Element
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-x-1">
                <LinkIcon className="w-4 h-4 min-w-4" />
                Page URL
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
          {data.map((event, index) => (
            <TableRow key={event._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{event.ip}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>
                <Tooltip>
                  <div className="inline-flex">
                    <TooltipTrigger>
                      {event.element === 'A' ? (
                        <Link2 className="w-4 h-4 mr-2" />
                      ) : event.element === 'INPUT' ? (
                        <TextCursorInput className="w-4 h-4 mr-2" />
                      ) : event.element === 'IMG' ? (
                        <ImageIcon className="w-4 h-4 mr-2" />
                      ) : event.element === 'P' ? (
                        <TextIcon className="w-4 h-4 mr-2" />
                      ) : (
                        <Pointer className="w-4 h-4 mr-2" />
                      )}
                    </TooltipTrigger>
                    {event.element}
                    <TooltipContent>
                      <div className="flex flex-col">
                        {event.details.label ? (
                          <span className="inline-flex items-center gap-x-1">
                            <span className="font-medium">Label:</span>{' '}
                            <span className="text-gray-700">
                              {event.details.label}
                            </span>
                          </span>
                        ) : null}
                        {event.details.name ? (
                          <span className="inline-flex items-center gap-x-1">
                            <span className="font-medium">Name:</span>{' '}
                            <span className="text-gray-700">
                              {event.details.name}
                            </span>
                          </span>
                        ) : null}
                        {event.details.src ? (
                          <span className="inline-flex items-center gap-x-1">
                            <span className="font-medium">Src:</span>{' '}
                            <span className="text-gray-700">
                              {event.details.src}
                            </span>
                          </span>
                        ) : null}
                        {event.details.alt ? (
                          <span className="inline-flex items-center gap-x-1">
                            <span className="font-medium">Alt:</span>{' '}
                            <span className="text-gray-700">
                              {event.details.alt}
                            </span>
                          </span>
                        ) : null}
                      </div>
                    </TooltipContent>
                  </div>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="whitespace-nowrap max-w-32 overflow-hidden overflow-ellipsis inline-block">
                      {event.currentHref}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col">
                      <div className="inline-flex gap-x-1">
                        <span className="font-medium">Full URL:</span>{' '}
                        <span className="text-gray-700">
                          {event.currentHref}
                        </span>
                      </div>
                      {event.pageTitle ? (
                        <div className="inline-flex gap-x-1">
                          <span className="font-medium">Page:</span>{' '}
                          <span className="text-gray-700">
                            {event.pageTitle}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{getDate(event.timestamp)}</TableCell>
              <TableCell>{event.screenSize}</TableCell>
              <TableCell>
                <Tooltip>
                  <div className="inline-flex">
                    <TooltipTrigger>
                      <Info className="w-4 h-4 mr-2" />
                    </TooltipTrigger>
                    <span className="whitespace-nowrap max-w-32 overflow-hidden overflow-ellipsis inline-block">
                      {event.userAgent}
                    </span>
                  </div>
                  <TooltipContent>
                    <span className="font-medium">Full info:</span>{' '}
                    <span className="text-gray-700">{event.userAgent}</span>
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

export default EventsTable
