const blogFacade = require('./../facades/blogFacade');
const userFacade = require('./../facades/userFacade');
const loginFacade = require('./../facades/loginFacade');
const { DateTime } = require('@okgrow/graphql-scalars');

module.exports = {
	DateTime,
	Query: {
		getUserByUserName: ({ userName }) => {
			return userFacade.findByUsername(userName);
		},
		getUserById: ({ userId }) => {
			return userFacade.findById(userId);
		},
		getAllUsers: () => {
			return userFacade.getAllUsers();
		},
		getAllBlogs: () => {
			return blogFacade.getAllLocationBlogs();
		},
		loginForFriends: ({ input }) => {
			return loginFacade.login(
				input.userName,
				input.password,
				input.longitude,
				input.latitude,
				input.distance
			);
		},
		findBlogByID: ({ id }) => {
			return blogFacade.findById(id);
		},
		findBlogsByAuthor: ({ authorId }) => {
			return blogFacade.findByAuthor(authorId);
		}
	},
	Mutation: {
		createLocationBlog: () => {
			return 'Not Implemented yet';
		},
		createUser: () => {
			return 'Not Implemented yet';
		},
		likeLocationBlog: () => {
			return 'Not Implemented yet';
		}
	}
};
