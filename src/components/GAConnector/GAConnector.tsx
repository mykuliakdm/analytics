'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { getError } from '@/utils/getError'
import { Unplug, Loader2, CheckCheck, Terminal } from 'lucide-react'

type GAConnectorProps = {
  projectId: string
}

const GAConnector = ({ projectId }: GAConnectorProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleCompleted = useCallback(() => {
    setIsCompleted(true)
  }, [])

  const handleConnect = useCallback(async () => {
    setIsLoading(true)
    try {
      await axios
        .get('/api/ga/connect', {
          params: { projectId },
        })
        .then(({ data }) => {
          if (!data.success) {
            setError(data.error)
          }
          if (data.success) {
            router.push(`/projects/${projectId}/ga`)
          }
        })
        .catch((error) => {
          setError(error.response.data.error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      console.log(getError(error as Error))
    }
  }, [projectId])

  return (
    <>
      {error ? (
        <Alert className="mb-4" data-test-id="alert">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Some error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {isCompleted ? (
        <Button onClick={handleConnect}>
          Connect
          {isLoading ? <Loader2 className="animate-spin" /> : <Unplug />}
        </Button>
      ) : (
        <Button variant="outline" onClick={handleCompleted}>
          <CheckCheck />
          I&apos;ve completed these points
        </Button>
      )}
    </>
  )
}

export default GAConnector
