import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user && !session.user.input) {
        const userWithInput = await prisma.user.findFirst({
          where: {
            id: session.user.id,
          },
          include: {
            input: true,
          },
        });
        session.user = userWithInput;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
