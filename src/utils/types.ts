import { ReactNode } from 'react'

export interface IProject {
  name: string
  url: string
  userId: string
  createdAt: Date
  updatedAt: Date
  __v: string
  _id: string
}

export interface IVisit {
  id: string
  projectId: string
  userAgent: string
  ip: string
  href: string
  screenSize: string
  timestamp: number
  time: number
  _id: string
}

export interface IEvent {
  id: string
  projectId: string
  ip: string
  screenSize: string
  timestamp: number
  userAgent: string
  type: string
  currentHref: string
  element: string
  details: {
    label: string
    alt: string
    src: string
    newHref: string
    name: string
    blank: boolean
  }
  _id: string
}

export interface IProjectNav {
  slug: string
  label: string
  icon?: ReactNode
}

export interface IMeta {
  totalCount: number
}
