require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const expressJwt = require("express-jwt");
const mongoose = require("mongoose");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const app = express();

mongoose.connect(
	"mongodb+srv://" +
		process.env.DB_USER +
		":" +
		process.env.DB_PASSWORD +
		"@gql-unify.e1nze.mongodb.net/" +
		process.env.DB_DATABASE +
		"?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
	console.log("Connected to database");
});

app.use(
	expressJwt({
		secret: process.env.APP_SECRET,
		algorithms: ["HS256"],
		credentialsRequired: false,
	})
);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const auth = req.headers.authorization || "";
		return { auth };
	},
});

server.applyMiddleware({ app });

app.listen(4000, () => {
	console.log("Server running on port 4000");
});
