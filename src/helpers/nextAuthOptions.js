import connect from "@/config/dbConfig";
import User from "@/models/UserModel";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import bcypt from 'bcrypt'

const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                await connect();
                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error('invalid credentials');
                    }
                    const match = await bcypt.compare(credentials.password, user.password)
                    if (!match) {
                        throw new Error('invalid credentials');
                    }
                    return user;
                } catch (error) {
                    throw new Error(error);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user }) {
            await connect();
            try {
                if (user?.email) {
                    const exist = await User.findOne({ email: user?.email })
                    if (exist) {
                        return true;
                    } else {
                        await User.create({
                            name: user?.name,
                            email: user?.email,
                            image: user?.image,
                            role: 'user'
                        })
                        return true;
                    }
                } else {
                    return false
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        async session({ session }) {
            await connect();
            try {
                const exist = await User.findOne({ email: session.user?.email })
                if (exist) {
                    session.user.role = exist.role
                    session.user.name = exist.name
                    session.user.id = exist._id
                    if (exist.image) {
                        session.user.image = exist?.image
                    }
                    return session;
                } else {
                    return session;
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    pages: {
        error: '/login',
        signIn: '/login',
        signOut: '/'
    }
}

export default authOptions;