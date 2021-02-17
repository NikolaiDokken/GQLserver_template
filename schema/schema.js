const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const User = require("../models/user");
const Study = require("../models/study");
const course = require("../models/course");

/////////////// Types ////////////////////
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    study: {
      type: StudyType,
      resolve(parent, args) {
        return Study.findById(parent.studyId);
      },
    },
  }),
});

//////////////// RootQueries //////////////////

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});

/////////////// Mutations ///////////////////////

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        studyId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let user = new User({
          firstname: args.firstname,
          lastname: args.lastname,
          studyId: args.studyId,
        });
        return user.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
