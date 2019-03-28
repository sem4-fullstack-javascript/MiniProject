const mongoose = require('mongoose');
const expect = require('chai').expect;
var connect = require('../dbConnect.js');
const db_con = require('../settings').TEST_DB_URI;
var userFacade = require('../facades/userFacade');
var User = require('../models/User');

describe('Testing the User Facade', function() {
	/* Connect to the TEST-DATABASE */
	before(async function() {
		//this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
		await connect(db_con);
	});

	after(async function() {
		await mongoose.disconnect();
	});

	var users = [];
	/* Setup the database in a known state (2 users) BEFORE EACH test */
	beforeEach(async function() {
		await User.deleteMany({});
		users = await User.insertMany([
			{
				firstName: 'Kurt',
				lastName: 'Wonnegut',
				userName: 'kw',
				password: 'test',
				email: 'a@b.dk'
			},
			{
				firstName: 'Hanne',
				lastName: 'Wonnegut',
				userName: 'hw',
				password: 'test',
				email: 'b@b.dk'
			}
		]);
	});

	it('Should find all users (Kurt and Hanne)', async function() {
		var users = await userFacade.getAllUsers();
		expect(users.length).to.be.equal(2);
	});

	it('Should Find Kurt Wonnegut by Username', async function() {
		var user = await userFacade.findByUsername('kw');
		expect(user.firstName).to.be.equal('Kurt');
	});

	it('Should Find Kurt Wonnegut by ID', async function() {
		var user = await userFacade.findById(users[0]._id);
		expect(user.firstName).to.be.equal('Kurt');
	});

	it('Should add Peter Pan', async function() {
		var user = await userFacade.addUser(
			'Peter',
			'Pan',
			'peter',
			'test',
			'a@b.dk'
		);
		expect(user).to.not.be.null;
		expect(user.firstName).to.be.equal('Peter');
		var users = await userFacade.getAllUsers();
		expect(users.length).to.be.equal(3);
	});
});
