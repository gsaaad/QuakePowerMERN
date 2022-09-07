// resolves for typeDefs
const { User, Earthquake } = require("../models");
const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date Custom Scalar",
  serialize(value) {
    // convert outoging Date to integer for JSON
    return value.getTime();
  },
  parseValue(value) {
    // convert incoming integer to Date
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});
const resolvers = {
  Query: {
    earthquakes: async () => {
      return Earthquake.find().sort();
    },
  },
  Date: {
    dateScalar,
  },
};

module.exports = resolvers;
