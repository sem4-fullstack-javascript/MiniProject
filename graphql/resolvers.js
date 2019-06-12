const blogFacade = require('./../facades/blogFacade');
const userFacade = require('./../facades/userFacade');
const loginFacade = require('./../facades/loginFacade');
const { DateTime } = require('@okgrow/graphql-scalars');

module.exports = {
	DateTime,
	Query: {
		getUserByUserName: (_, { userName }) => {
			return userFacade.findByUsername(userName);
		},
		getUserById: (_, { userId }) => {
			return userFacade.findById(userId);
		},
		getAllUsers: () => {
			return userFacade.getAllUsers();
		},
		getAllBlogs: () => {
			return blogFacade.getAllLocationBlogs();
		},
		loginForFriends: (_, { input }) => {
			return loginFacade.login(
				input.userName,
				input.password,
				input.longitude,
				input.latitude,
				input.distance
			);
		},
		findBlogByID: (_, { id }) => {
			return blogFacade.findById(id);
		},
		findBlogsByAuthor: (_, { authorId }) => {
			return blogFacade.findByAuthor(authorId);
		}
	},
	Mutation: {
		createLocationBlog: (_, { info, longitude, latitude, img, author }) => {
			const pos = { latitude, longitude };
			return blogFacade.addLocationBlog(info, img, pos, author);
		},
		createUser: () => {
			return 'Not Implemented yet';
		},
		likeLocationBlog: () => {
			return 'Not Implemented yet';
		}
	}
};
