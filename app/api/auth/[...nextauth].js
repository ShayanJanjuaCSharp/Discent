import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
  ],
  callbacks: {
        async session({session}){
            return session;
        },
        async SignIn({profile}){
            console.log(profile);
            
        }
  }
}
export default NextAuth(authOptions)

