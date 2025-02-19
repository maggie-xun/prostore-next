import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './db/prisma'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'
// import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const config = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  adapter: PrismaAdapter({ prisma }),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        if (credentials == null) return null
        const user = await prisma.user.findFirst({ where: { email: credentials.email as string } })
        console.log(user, 'user')
        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password)
          console.log('is mathc', isMatch)
          if (isMatch) {
            return { id: user.id, name: user.name, email: user.email, role: user.role }
          }
          return null
        }
        return null
      }
    })
    // if(credentials.email === 'admin' && credentials.password === 'admin'){
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub
      if (trigger === 'update') {
        session.user.name = user.name
        session.user.role = user.role
        session.user.name = user.name
      }

      return session
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role

        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0]
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.ame }
          })
        }
      }
      return token
    },

    authorized({ request, auth }: any) {
      // if the sessionCartId cookie is not set, generate a new one

      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID()
        console.log('sessionCartId', sessionCartId)
        const newRequestHeader = new Headers(request.headers)

        const response = NextResponse.next({
          request: {
            headers: newRequestHeader
          }
        })
        //set newly generated sessionCartId in the response cookies
        response.cookies.set('sessionCartId', sessionCartId)
        return response
      } else {
        return true
      }
    }
  }
} satisfies NextAuthConfig
export const { handlers, auth, signIn, signOut } = NextAuth(config)
