const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async function(parent, args, context) {
      const foundUser = await User.findOne({
        username: args.username ,
      });
  
      if (!foundUser) {
        throw AuthenticationError;
      }
  
      return (foundUser);
    },
  },

  Mutation: {
    createUser: async function(parent, args, context) {
      const user = await User.create(args);
  
      if (!user) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return({ token, user });
    },
    login: async function(parent, args, context) {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        throw AuthenticationError;
      }
  
      const correctPw = await user.isCorrectPassword(args.password);
  
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return({ token, user });
    },
     saveBook: async function(parent, args, context) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return (updatedUser);
      } catch (err) {
        console.log(err);
        throw AuthenticationError;
      }
    },
    deleteBook: async function(parent, args, context) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw AuthenticationError;
      }
      return (updatedUser);
    },
  },
};

module.exports = resolvers;
