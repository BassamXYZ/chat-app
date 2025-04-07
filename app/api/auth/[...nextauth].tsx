import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Providers from 'next-auth/providers'
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        }
        return null;
      }
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  theme: {
    colorScheme: 'dark',
    brandColor: '#7c3aed',
  },
  secret: process.env.NEXTAUTH_SECRET,
});