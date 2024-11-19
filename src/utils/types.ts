import { ReactNode } from 'react'

export interface IProject {
  name: string
  url: string
  userId: string
  google?: {
    propertyId?: string
    isConnected: boolean
  }
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
  pageTitle?: string
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
  pageTitle?: string
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

export interface ICustomer {
  productId: string
  ip: string
  screenSize: string
  timestamp: number
  userAgent: string
  language: string
  href: string
  pageTitle?: string
  details?: {
    status: string
    country: string
    countryCode: string
    region: string
    regionName: string
    city: string
    zip: string
    lat: string
    lon: string
    timezone: string
    isp: string
    org: string
    as: string
    query: string
  }
  session?: {
    referral: boolean
    direct: boolean
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

export type dataTypeProps = 'visits' | 'events' | 'navigation' | 'traffic'

export interface IGAData {
  dimensionHeaders: { name: string }[]
  metricHeaders: {
    name: string
    type: string
  }[]
  rows: {
    dimensionValues: {
      value: string
      oneValue: string
    }[]
    metricValues: {
      value: string
      oneValue: string
    }[]
  }[]
  totals: unknown[]
  maximums: unknown[]
  minimums: unknown[]
  rowCount: number
  metadata: {
    samplingMetadatas: unknown[]
    dataLossFromOtherRow: boolean
    schemaRestrictionResponse: {
      activeMetricRestrictions: unknown[]
    }
    _schemaRestrictionResponse: string
    currencyCode: string
    _currencyCode: string
    timeZone: string
    _timeZone: string
  }
  propertyQuota: string | null
  kind: string
}
