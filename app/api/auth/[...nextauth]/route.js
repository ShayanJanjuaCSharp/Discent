import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {cookies} from 'next/headers'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const bakery = await cookies();
      await bakery.set("user", session.user.name);
      return session;
    },
    async signIn({ profile }) {
      const bakery = await cookies();
      await bakery.set("user", profile.name);
      console.log(profile);
      return true;
    }
  }
});

export { handler as GET, handler as POST };