import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const getUserFromDb = async (
    email: string | unknown,
    password: string | unknown
) => {
    if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return null;
    }

    const user = {
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
    };
    return user;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                // logic to verify if the user is valid
                user = await getUserFromDb(
                    credentials.email,
                    credentials.password
                );

                if (!user) {
                    throw new Error("Invalid credentials.");
                }

                return user;
            },
        }),
    ],
});
