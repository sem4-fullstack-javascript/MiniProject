const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
    type Query {
        getUserByUserName(userName: String!): User
        getUserById(userId: ID!): User
        getAllUsers: [User]
        getAllBlogs: [LocationBlog]
        loginForFriends(input: LoginInput!): Friends
        findBlogByID(id: ID!): LocationBlog
        findBlogsByAuthor(authorId: ID!): [LocationBlog]
    }

    type Mutation{
        createLocationBlog(input: LocationBlogInput): LocationBlog
        createUser(input: UserInput): User
        likeLocationBlog(blogId: ID!userId: ID!): LocationBlog
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        userName: String
        email: String
        job: [Job]
        created: DateTime
        lastUpdated: DateTime
    }

    type Job {
        type: String
        company: String
        companyUrl: String
    }

    scalar DateTime

    type LocationBlog {
        _id: ID!
        info: String!
        img: String
        pos: Position
        author: ID!
        likedBy: [ID]
        likedByCount: Int
        created: DateTime
        lastUpdated: DateTime
        slug: String
    }

    type Position {
        longitude: Float!
        latitude: Float!
    }

    input LoginInput {
        userName: String!
        password: String!
        longitude: Float!
        latitude: Float!
        distance: Int!
    }

    type Friends {
        friends: [Friend]
    }

    type Friend {
        userName: String!
        latitude: Float!
        longitude: Float!
    }

    input LocationBlogInput {
        info: String
        longitude: Float
        latitude: Float
        author: ID
        img: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        userName: String!
        email: String!
        password: String!
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema, typeDefs, resolvers };
