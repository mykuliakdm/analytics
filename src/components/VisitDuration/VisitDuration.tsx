import { intervalToDuration } from 'date-fns'

const VisitDuration = ({ time }: { time: number }) => {
  const interval = intervalToDuration({
    start: 0,
    end: time * 1000,
  })

  if (Object.keys(interval).length === 0) {
    return <div className="d-inline-flex align-items-center">1s</div>
  }

  return (
    <div className="d-inline-flex align-items-center whitespace-nowrap">
      {interval.days ? `${interval.days}d` : null}
      {interval.hours ? ` ${interval.hours}h` : null}
      {interval.minutes ? ` ${interval.minutes}m` : null}
      {interval.seconds ? ` ${interval.seconds}s` : null}
    </div>
  )
}

export default VisitDuration
