const { GraphQLScalarType, Kind } = require("graphql");
const { DateTimeResolver } = require("graphql-scalars");

module.exports = {
  DateScalar: new GraphQLScalarType({
    name: "CustomDate",
    description: "Custom Date Scalar type",

    // parseValue(value) {
    //   return value;
    //   // return new Date(value);
    // },
    // parseLiteral(ast) {
    //   // if (ast.kind === Kind.INT) {
    //   // return parseInt(ast.value, 10);
    //   // return new Date(ast.value);
    //   // }
    //   // return null;
    //   return ast;
    // },
    // serialize(value) {
    //   return value;
    //   // const date = new Date(value);
    //   // return date.toISOString();
    //   // return value.getTime();
    // },
    serialize: DateTimeResolver.serialize,
    parseValue: DateTimeResolver.parseValue,
    parseLiteral: (ast) => {
      if (ast.kind === Kind.STRING) {
        return DateTimeResolver.parseValue(ast.value);
      }
      return null;
    },
  }),
};
