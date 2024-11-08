import NextAuth, { NextAuthOptions, Session, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import db from '@/utils/db'
import UserDB from '../../../../../models/User'
import { compareSync } from 'bcrypt'
import { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.')
        }

        await db.connect()

        const user = await UserDB.findOne({
          email: credentials.email,
        })

        if (!user) {
          throw new Error('User with this email does not exist.')
        }

        if (compareSync(credentials.password, user.password)) {
          return user
        }

        throw new Error('Invalid email or password.')
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
      }
      return session
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60,
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
