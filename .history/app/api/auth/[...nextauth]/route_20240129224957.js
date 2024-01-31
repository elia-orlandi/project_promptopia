import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

import { User } from "@models/User";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({session}) {

    },
    async signIn({signIn}) {
        try {
            await connectToDB()

            // check if a user exists in the database
            
            // if not, create a new user
            
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
})

export { handler as GET, handler as POST }