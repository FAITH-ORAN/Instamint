import { jwtDecode } from "jwt-decode"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    // eslint-disable-next-line new-cap
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/sign-in`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        )
        const user = await res.json()

        if (res.ok && user) {
          return user
        }

        return null
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line require-await
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
      }

      return token
    },
    // eslint-disable-next-line require-await
    async session({ session, token }) {
      const { fullName, email, id } = jwtDecode(token.accessToken)
      session.user.email = email
      session.user.username = fullName
      session.user.id = id
      session.accessToken = token.accessToken

      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}

// eslint-disable-next-line new-cap
export default NextAuth(authOptions)
