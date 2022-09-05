// resolves for typeDefs
const { User, Earthquake } = require("../models");
const resolvers = {
  Query: {
    earthquakes: async () => {
      return Earthquake.find().sort();
    },
  },
};

module.exports = resolvers;
