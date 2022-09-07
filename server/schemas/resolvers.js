// resolves for typeDefs
const { User, Earthquake } = require("../models");
const dateScalar = require("./dateScalar");
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
  DateScalar: {
    dateScalar,
  },
};

module.exports = resolvers;
