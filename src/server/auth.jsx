import GoogleProvider from "next-auth/providers/google";
import { DataTypes } from "sequelize";
import SequelizeAdapter, { models } from "@auth/sequelize-adapter";
import { db } from "./api/db";
import UserModel from "./api/models/user";

if (!db.defined) {
  db.connection();
}

export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          current_db_interacting: profile.current_db_interacting,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  adapter: SequelizeAdapter(db.sequelize, {
    models: {
      User: UserModel(db.sequelize, DataTypes, models.User),
    },
  }),
  session: {
    jwt: false,
  },
  callbacks: {
    session: async (session, user) => {
      if (user != undefined) {
        session.user = user;
      }
      return Promise.resolve(session);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
