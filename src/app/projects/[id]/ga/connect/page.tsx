import GAConnector from '@/components/GAConnector/GAConnector'
import Image from 'next/image'
import { SquareArrowOutUpRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

const GA = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/projects">Projects</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Integration</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="max-w-3xl mx-auto">
        <Image
          src="/Logo_Google_Analytics.svg"
          width={200}
          height={68}
          alt="Google Analytics"
        />
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mt-6 mb-2">
          Step-by-Step Guide to Integrating Your App with GA
        </h1>
        <p>
          Follow our detailed instructions, complete with screenshots, to
          successfully connect your app to Google Analytics. Learn how to set
          up, authorize, and start tracking essential metrics with ease.
        </p>

        <hr className="my-10 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        <h3 className="text-lg font-extrabold tracking-tight mb-8">
          Add our user to your Analytics
        </h3>
        <ol className="space-y-4 list-decimal list-inside">
          <li>
            In{' '}
            <a
              href="https://analytics.google.com/analytics/web/#/?pagename=admin&amp;utm_source=gahc&amp;utm_medium=dlinks"
              target="_blank"
              className="inline-flex items-center text-blue-700"
            >
              <span className="font-semibold">Admin</span>
              <SquareArrowOutUpRight className="w-3 h-3 inline-flex items-center justify-center ml-1" />
            </a>
            , under <span className="italic">Account or Property</span>{' '}
            (depending on where you want to add users), click{' '}
            <span className="font-semibold">Access Management</span>.
          </li>
          <Image
            src="/ga-steps/1.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: 'auto' }}
            alt="Step 1"
          />
          <li>
            In the Account/Properties permissions list, click{' '}
            <span className="font-semibold">+</span>, then click{' '}
            <span className="font-semibold">Add users</span>.
          </li>
          <Image
            src="/ga-steps/2.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            alt="Step 2"
          />
          <li>
            Enter the email <br />
            <span className="font-semibold">{process.env.GA_CLIENT_EMAIL}</span>
            <br />
            address for the user&apos;s
          </li>
          <Image
            src="/ga-steps/3.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            alt="Step 3"
          />
          <li>
            Select{' '}
            <span className="font-semibold">Notify new users by email</span> to
            send a message to the user.
          </li>
          <li>
            Select the permissions you want. Learn more about{' '}
            <a
              href="https://support.google.com/analytics/answer/9305587"
              target="_blank"
              className="text-blue-700"
            >
              permissions
            </a>
            . <br />
            <span className="font-semibold">Viewer</span> will be enough.
          </li>
          <li>
            Click <span className="font-semibold">Add</span>
          </li>
        </ol>
        <p className="mt-6">
          The Google email address you use to add a user and the password
          associated with that address become the Analytics login credentials
          for that user.
        </p>
        <hr className="my-10 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        <GAConnector projectId={id} />
      </div>
    </>
  )
}

export default GA
