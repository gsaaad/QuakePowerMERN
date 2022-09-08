// resolves for typeDefs
const { User, Earthquake } = require("../models");
const DateScalar = require("./dateScalar");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/authenticateUser");

const resolvers = {
  // query
  DateScalar: DateScalar,
  Query: {
    // all earthquakes
    earthquakes: async (parent, { username }) => {
      // return Earthquake.find().sort();
      const params = username ? { username } : {};
      return Earthquake.find(params).sort();
    },
    // single earthquake
    earthquake: async (parent, { _id }) => {
      return Earthquake.findOne({ _id });
    },
    // all users
    users: async () => {
      return User.find().select("-__v -password").populate("earthquakes");
    },
    // single user
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("earthquakes");
    },
  },
  Mutation: {
    // add user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // loging in
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
