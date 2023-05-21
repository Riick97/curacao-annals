import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Please enter email of password");
        }

         const user = {
           id: 1,
           firstName: "Visi",
           lastName: "User",
           email: "visi@user.com",
           password: "visi123$",
           role: 'admin',
         };

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = password === user.password
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }
        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return Promise.resolve(session);
    },
  },
});
