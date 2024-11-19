import { BetaAnalyticsDataClient } from '@google-analytics/data'

export const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY!.split(String.raw`\n`).join('\n'), // replacing is necessary
  },
})
