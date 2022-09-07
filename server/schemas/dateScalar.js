const { GraphQLScalarType, Kind } = require("graphql");

// const dateScalar = new GraphQLScalarType({
//   name: "Date",
//   description: "Date Custom Scalar",
//   serialize(value) {
//     // convert outoging Date to integer for JSON
//     console.log("getting time!");
//     const date = new Date(value);
//     return date.toISOString();
//   },
//   parseValue(value) {
//     // convert incoming integer to Date
//     // return new Date(value);
//     return new Date(value);
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       return new Date(parseInt(ast.value, 10));
//     }
//     return null;
//   },
// });

// module.exports = dateScalar;

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
