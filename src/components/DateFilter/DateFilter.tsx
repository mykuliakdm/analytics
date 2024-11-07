import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { format } from 'date-fns'
import { CalendarIcon, Filter, X } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'

type DateFilterProps = {
  onSelect: (dateRange: DateRange | undefined) => void // eslint-disable-line no-unused-vars
}

const DateFilter = ({ onSelect }: DateFilterProps) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  const { handleSubmit, register } = useForm()

  const value = `${date?.from ? format(date.from, 'dd/MM/yy') : '__/__/__'} - ${date?.to ? format(date.to, 'dd/MM/yy') : '__/__/__'}`

  const onSubmit = () => date && onSelect(date)

  const handleReset = useCallback(() => {
    setDate(undefined)
    onSelect(undefined)
  }, [onSelect])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-x-1"
    >
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              {...register('date')}
              id="date"
              placeholder="Pick a date range"
              value={date ? value : ''}
              autoComplete="new-date"
              readOnly
            />
            <CalendarIcon className="absolute w-4 h-4 top-3 right-2 text-gray-500" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={(d) => setDate(d!)}
          />
        </PopoverContent>
      </Popover>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button variant="outline" type="submit">
              <Filter />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Apply filter</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button variant="ghost" onClick={handleReset}>
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset filter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  )
}

export default DateFilter
