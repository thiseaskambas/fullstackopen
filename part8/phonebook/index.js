const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const User = require("./models/user");

const mongoDB = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connection to MongoDB : ", err.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
