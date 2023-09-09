import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { generateRandomString } from "@/utils/random";

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
				const randomSuffix = generateRandomString();
				const firstName = user.name?.split(" ")[0];
				await prisma.user.create({
					data: {
						email: user.email!,
						name: user.name!,
						username: `${firstName}#${randomSuffix}`
					}
				});
			}

			return true;
		}
	}
});

export { handler as GET, handler as POST };
