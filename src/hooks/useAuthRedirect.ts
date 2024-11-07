'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const useAuthRedirect = () => {
  const router = useRouter()
  const { data = null } = useSession()

  useEffect(() => {
    const handleAuthorization = async () => {
      if (!data) {
        router.replace('/sign-in')
      }
    }

    handleAuthorization()
  }, [data, router])
}

export default useAuthRedirect
