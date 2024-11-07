import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Header from '@/components/Header/Header'
import SessionProvider from '@/providers/SessionProvider'
import Container from '@/components/Container/Container'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web Tracker for User Data Collection and Analysis',
  description:
    'This project is designed to collect user information on a website, including project ID, timestamp, browser and platform details, screen size, language, browsing history, and IP address. The system provides efficient data collection and analysis, enabling website owners to better understand their audience and improve website performance.',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>
          <Header />
          <main>
            <Container>{children}</Container>
          </main>
        </body>
      </SessionProvider>
    </html>
  )
}
