// resolves for typeDefs
const { User, Earthquake } = require("../models");
const DateScalar = require("./dateScalar");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/authenticateUser");

const resolvers = {
  // query
  DateScalar: DateScalar,
  Query: {
    // logging in with Auth
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("earthquakes");

        return userData;
      }
      throw new AuthenticationError("not logged in");
    },
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
      console.log("Successful regitration!");
      return { token, user };
    },
    // addEarthquake
    addEarthquake: async (parent, args, context) => {
      if (context.user) {
        const earthquake = await Earthquake.create({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: { earthquakes: earthquake._id },
          },
          { new: true }
        );
        return earthquake;
      }
      throw new AuthenticationError(
        "You need to be Logged in to add an earthquake"
      );
    },
    addReaction: async (parent, { earthquakeId, reactionBody }, context) => {
      if (context.user) {
        const updatedEarthquake = await Earthquake.findOneAndUpdate(
          {
            _id: earthquakeId,
          },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedEarthquake;
      }
      throw new AuthenticationError("You need to be logged in!");
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
      console.log("Successful login!");
      return { token, user };
    },
  },
};

module.exports = resolvers;
