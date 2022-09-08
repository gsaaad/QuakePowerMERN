// resolves for typeDefs
const { User, Earthquake } = require("../models");
const dateScalar = require("./dateScalar");
const { AuthenticationError } = require("apollo-server-express");
const resolvers = {
  Query: {
    earthquakes: async (parent, { username }) => {
      // return Earthquake.find().sort();
      const params = username ? { username } : {};
      return Earthquake.find(params).sort();
    },
    earthquake: async (parent, { _id }) => {
      return Earthquake.findOne({ _id });
    },
    users: async () => {
      return User.find().select("-__v -password").populate("earthquakes");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("earthquakes");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid credentials");
      }
      return user;
    },
  },
  DateScalar: {
    dateScalar,
  },
};

module.exports = resolvers;
