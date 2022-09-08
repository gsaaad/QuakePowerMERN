const { GraphQLScalarType, Kind } = require("graphql");

module.exports = {
  DateScalar: new GraphQLScalarType({
    name: "DateScalar",
    description: "Date Scalar type",

    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // return parseInt(ast.value, 10);
        return new Date(ast.value);
      }
      return null;
    },
    serialize(value) {
      // const date = new Date(value);
      // return date.toISOString();
      return value.getTime();
    },
  }),
};
