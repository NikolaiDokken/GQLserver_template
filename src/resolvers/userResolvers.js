const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
	UserInputError, // Throw an error if empty fields.
	AuthenticationError,
} = require("apollo-server");

const User = require("../models/user");

// Helper method used for verifying token in headers
const isAuth = async (auth) => {
	const token = auth.split("Bearer ")[1];
	if (!token) throw new AuthenticationError("Token not provided");

	const userId = await jwt.verify(
		token,
		process.env.APP_SECRET,
		(err, decoded) => {
			if (err) throw new AuthenticationError("invalid token!");
			return decoded.userId;
		}
	);

	return userId;
};

const resolvers = {
	Query: {
		async user(parent, { id }, { auth }) {
			const userId = await isAuth(auth);
			if (userId) {
				return User.findById(id);
			}
		},
		users() {
			return User.find({});
		},
	},
	Mutation: {
		async login(parent, { email, password }) {
			if (!email || !password) {
				throw new UserInputError("Invalid input");
			}

			const user = await User.findOne({ email: email });

			// User does not exist
			if (!user) throw new AuthenticationError("User not found!");

			// Incorrect password
			const valid = await bcrypt.compare(password, user.password);
			if (!valid) throw new AuthenticationError("Wrong credentials!");

			// Sign JWT token that is to be returned
			return jwt.sign({ userId: user._id }, process.env.APP_SECRET, {
				algorithm: "HS256",
				expiresIn: "15min",
			});
		},
		async registerUser(
			parent,
			{ email, password, confirmPassword, firstname, lastname }
		) {
			// Password inputs must match
			if (password !== confirmPassword) {
				throw new UserInputError("Passwords must match");
			}

			// User already exists
			const user = await User.findOne({ email: email });
			if (user) throw new ValidationError("Email already in use");

			// Save and return the new user. Store hashed password in DB
			const newUser = new User({
				email,
				password: await bcrypt.hash(password, 12),
				firstname,
				lastname,
			});

			return newUser.save();
		},
	},
};

module.exports = resolvers;
