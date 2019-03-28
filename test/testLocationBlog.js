const mongoose = require('mongoose');
const expect = require('chai').expect;
var connect = require('../dbConnect.js');
const db_con = require('../settings').TEST_DB_URI;
var blogFacade = require('../facades/blogFacade');
var userFacade = require('../facades/userFacade');
var LocationBlog = require('../models/LocationBlog');

describe('Testing the LocationBlog Facade', function() {
	/* Connect to the TEST-DATABASE */
	before(async function() {
		//this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
		await connect(db_con);
	});

	after(async function() {
		await mongoose.disconnect();
	});

	var locationBlogs = [];
	var users = [];
	/* Setup the database in a known state (2 users) BEFORE EACH test */
	beforeEach(async function() {
		await LocationBlog.deleteMany({});
		users = await userFacade.getAllUsers();
		locationBlogs = await LocationBlog.insertMany([
			{
				info: 'Cool Place1',
				img: 'img.png',
				pos: { longitude: 26, latitude: 57 },
				author: users[0]._id
			},
			{
				info: 'Cool Place2',
				img: 'img.png',
				pos: { longitude: 26, latitude: 57 },
				author: users[0]._id
			}
		]);
	});

	it('Should find all locationblogs (Cool Place1 & Cool Place2)', async function() {
		var locationBlogs = await blogFacade.getAllLocationBlogs();
		expect(locationBlogs.length).to.be.equal(2);
	});

	it('Should Find Cool Place1 by ID', async function() {
		var locationBlog = await blogFacade.findById(locationBlogs[0]._id);
		expect(locationBlog.info).to.be.equal('Cool Place1');
	});

	it('Should Find Cool Place1 by info', async function() {
		var locationBlog = await blogFacade.findByInfo(locationBlogs[0].info);
		expect(locationBlog.info).to.be.equal('Cool Place1');
	});

	it('Should add Cool Place3', async function() {
		var locationBlog = await blogFacade.addLocationBlog(
			'Cool Place3',
			'img.png',
			{ longitude: 11, latitude: 12 },
			users[1]._id
		);
		expect(locationBlog).to.not.be.null;
		expect(locationBlog.info).to.be.equal('Cool Place3');
		var locationBlogs = await blogFacade.getAllLocationBlogs();
		expect(locationBlogs.length).to.be.equal(3);
	});

	it('Should like Cool Place2 for Kurt Wonnegut', async function() {
		var locationBlogs = await blogFacade.getAllLocationBlogs();
		var locationBlog = await blogFacade.findById(locationBlogs[1]._id);
		expect(locationBlog.likedBy).to.be.empty;
		locationBlog = await blogFacade.likeLocationBlog(
			locationBlogs[1]._id,
			users[0]._id
		);
		expect(locationBlog).to.not.be.null;
		expect(locationBlog.info).to.be.equal('Cool Place2');
		expect(locationBlogs.length).to.be.equal(2);
		expect(locationBlog.likedBy).to.be.contains(users[0]._id);
	});
});
