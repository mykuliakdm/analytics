import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  return (
    <div className="grid py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Welcome to Your Trusted Analytics Hub
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 [&:not(:last-child)]:mb-6 max-w-xl">
          Track, analyze, and optimize user engagement effortlessly. Our
          comprehensive analytics platform provides real-time insights into user
          interactions, helping you make data-driven decisions to boost growth.
        </p>
        <Button asChild>
          <Link href={`/projects`}>Get Started</Link>
        </Button>
      </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
          alt="mockup"
        />
      </div>
    </div>
  )
}
