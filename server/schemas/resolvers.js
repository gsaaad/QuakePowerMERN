// resolves for typeDefs
const { User, Earthquake } = require("../models");
const dateScalar = require("./dateScalar");
const resolvers = {
  Query: {
    earthquakes: async (parent, { username }) => {
      const params = username ? { username } : {};

      // return Earthquake.find().sort();
      return Earthquake.find(params).sort();
    },
  },
  DateScalar: {
    dateScalar,
  },
};

module.exports = resolvers;
