const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		id: ID!
		email: String!
		password: String!
		firstname: String
		lastname: String
	}

	type Query {
		user(id: ID!): User
		users: [User]
	}

	type Mutation {
		login(email: String!, password: String!): String
		registerUser(
			email: String!
			password: String!
			confirmPassword: String!
			firstname: String
			lastname: String
		): User
	}
`;

module.exports = typeDefs;
