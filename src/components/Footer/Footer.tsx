import Container from '@/components/Container/Container'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-white">
      <Container>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Image
                src="/logo.svg"
                width={150}
                height={38}
                alt="Web Analytics"
              />
            </Link>
            <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/projects" className="hover:underline me-4 md:me-6">
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}. All Rights Reserved.
          </span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
