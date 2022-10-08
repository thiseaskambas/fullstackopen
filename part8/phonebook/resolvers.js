const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Person = require("./models/person");
const User = require("./models/user");

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    personCount: async () => await Person.collection.countDocuments(),
    userCount: async () => await User.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }

      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
    firstName: (root) => root.name.split(" ")[0],
  },
  Mutation: {
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10);
      const user = new User({ username: args.username, passwordHash });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash);
      if (!passwordCorrect) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(userForToken, JWT_SECRET);
      return { value: token };
    },
    addPerson: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const person = new Person({ ...args });
      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish("PERSON_ADDED", { personAdded: person });
      return person;
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) =>
        currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString());

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;

      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return person;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator("PERSON_ADDED"),
    },
  },
};

module.exports = resolvers;
