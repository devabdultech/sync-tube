import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code"
				}
			}
		})
	],
	secret: process.env.JWT_SECRET!,
	callbacks: {
		async signIn({ user, profile }) {
			const existingUser = await prisma.user.findUnique({
				where: { email: user.email! }
			});

			if (!existingUser) {
				await prisma.user.create({
					data: {
						email: user.email!,
						name: user.name!
					}
				});
			}

			return true;
		}
	}
});

export { handler as GET, handler as POST };
