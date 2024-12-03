'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import { getInitials } from '@/utils/string/getInitials'
import { FolderGit2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import styles from './Header.module.scss'

const Header = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { data: session, status } = useSession()
  const user = session?.user || null

  useEffect(() => {
    if (!user && !['/', '/sign-in', '/sign-up'].includes(pathName)) {
      router.replace('/sign-in')
    }
  }, [user])

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 py-2.5 dark:bg-gray-800">
        <div className="mx-auto w-full max-w-screen-2xl px-2.5 md:px-20">
          <div className="flex flex-wrap justify-between items-center mx-auto">
            <Link
              href="/"
              className={classNames(styles['header-logo'], 'flex items-center')}
            >
              <Image src="/logo.svg" fill alt="Web Analytics" />
            </Link>
            <div className="flex items-center lg:order-2">
              <div className="relative flex items-center">
                {user && status === 'authenticated' ? (
                  <div className="inline-flex items-center gap-x-2">
                    <Button asChild variant="ghost">
                      <Link href={`/projects`}>
                        <FolderGit2 className="h-5 w-5" />
                        Projects
                      </Link>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar
                          className="cursor-pointer"
                          data-test-id="avatar"
                        >
                          <AvatarImage src={user.image!} />
                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <span>{user.name}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <span>{user.email}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <span onClick={() => signOut()}>
                            <LogOut />
                            <span>Log out</span>
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
