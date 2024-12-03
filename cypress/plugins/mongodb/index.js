import db from './../../../src/utils/db'
import Users from './../../../models/User'
import Projects from './../../../models/Project'
import Visits from './../../../models/Visit'
import Events from './../../../models/Event'

export const beforeRun = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not defined. Please define it in .env.testing',
    )
  }

  if (!process.env.DATABASE_URL.includes('test')) {
    throw new Error(
      "DATABASE_URL does not contain 'test'. Are you sure you want to run this on a production database?",
    )
  }

  await db.connect()

  /* Reset all test data */
  await Users.deleteMany({})
  await Projects.deleteMany({})
  await Visits.deleteMany({})
  await Events.deleteMany({})
}
