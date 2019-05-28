const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

//graphql
const graphqlHTTP = require('express-graphql');
const { schema, typeDefs, resolvers } = require('./graphql/schema');

//apollo server
const { ApolloServer } = require('apollo-server-express');
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/apollo' });

//mongoose connection
const connect = require('./dbConnect');
connect(require('./settings').DEV_DB_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
