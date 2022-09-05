// resolves for typeDefs

const resolvers = {
  Query: {
    helloWorld: () => {
      return `Hello world!
      You've just created your first GraphQL query
      
      `;
    },
  },
};

module.exports = resolvers;
