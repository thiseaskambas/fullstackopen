const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const mongoDB = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]
    ): Book!

    editAuthor(name: String, setBornTo: Int): Author

    createUser(
      username: String!
      favouriteGenre: String!
      password: String!
    ): User

    logIn(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const foundAuthor = args.author
        ? await Author.findOne({ name: args.author })
        : null;
      let query = foundAuthor ? { author: foundAuthor._id } : null;
      if (args.genre) {
        query = { ...query, genres: args.genre };
      }
      return await Book.find(query).populate("author");
    },
    allAuthors: async (root, args) => {
      try {
        const res = await Author.find({});
        console.log(res);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root, args) => {
      const num = await Book.count({ author: root._id });
      return num;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { title, author, published, genres } = args;
      try {
        let authorObj = await Author.findOne({ name: author });
        if (!authorObj) {
          const newAuthor = new Author({ name: author });
          authorObj = await newAuthor.save();
        }
        const newBook = new Book({
          title,
          published,
          genres,
          author: authorObj._id,
        });
        await newBook.save();
        await newBook.populate("author");
        return newBook;
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo });
    },
    createUser: async (root, args) => {
      try {
        const passwordHash = await bcrypt.hash(args.password, 10);
        const user = new User({
          username: args.username,
          passwordHash,
          favouriteGenre: args.favouriteGenre,
        });
        return user.save();
      } catch (err) {
        throw UserInputError(err.message);
      }
    },
    logIn: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const isCorrectPassword =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash);

      if (!isCorrectPassword) {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = { username: user.username, id: user._id };
      const token = jwt.sign(userForToken, JWT_SECRET);
      return { value: token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
