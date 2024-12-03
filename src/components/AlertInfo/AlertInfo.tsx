import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TriangleAlert } from 'lucide-react'

type AlertInfoProps = {
  title: string
  description: string
}

const AlertInfo = ({ title, description }: AlertInfoProps) => {
  return (
    <Alert className="my-4" data-test-id="alert">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export default AlertInfo
