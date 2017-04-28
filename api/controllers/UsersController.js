/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');

module.exports = {
	/**
	 * @description		Register a new user
	 * @author				Sriram Jayaraman <sriramemailsyou@gmail.com>
	 *
	 * @api 					{post} /users/register Register new users
	 * @apiName 			register
	 * @apiGroup 			users
   * @apiParam			{String} userName The userName of the user
   * @apiParam			{String} password The password of the user
	 * @apiSuccess 		{Object} registers and returns the user details
	 */
	register: function(req, res) {
		Users.findOne({name: req.param("userName")}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				delete response.password;
				return res.status(409).json({error : "Username is already in use"});
			}
			else {
				//Encrypt the password before storing it
				bcrypt.genSalt(10, function(err, salt) {
			  	bcrypt.hash(req.param('password'), salt, function(err, hash) {
			      Users.create({name: req.param('userName'), password: hash}).exec(function(err, response) {
							if(err)	return console.log(err);

							if(response) {
								//Sensitive information removed from response
								delete response.password;
								return res.json(response);
							}
						});
			  	});
				});
			}
		});
	},

	/**
	 * @description		Login into Yikes! account
	 * @author				Sriram Jayaraman <sriramemailsyou@gmail.com>
	 *
	 * @api 					{post} /users/login Login using Username and password
	 * @apiName 			login
	 * @apiGroup 			users
   * @apiParam			{String} userName The userName of the user
   * @apiParam			{String} password The password of the user
	 * @apiSuccess 		{Object} returns user details if valid
	 */
	login: function(req, res) {
		Users.findOne({name: req.param('userName')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				bcrypt.compare(req.param('password'), response.password, function(err, result) {
	    		if(result === true) {
						//Sensitive information removed from response
						delete response.password;
						return res.json(response);
					}
					else {
						return res.status(403).json({error : "The password seems to be incorrect"});
					}
				});
			}
			else {
				return res.status(404).json({error : "The username seems to be incorrect"});
			}
		});
	},

	/**
	 * @description		Subscribe a user to a chatroom
	 * @author				Sriram Jayaraman <sriramemailsyou@gmail.com>
	 *
	 * @api 					{post} /users/subscribe Subscribe user to chatroom
	 * @apiName 			subscribe
	 * @apiGroup 			users
   * @apiParam			{String} roomid ID of the Chat room to be subscribed
   * @apiParam			{String} userid ID of the user to subscribe the chatroom to
	 * @apiSuccess 		{Object} returns updated user details after subscription
	 */
	addSubscription: function(req, res) {
		Users.findOne({id: req.param('userid')}).exec(function(err, userData) {
			if(err)	return console.log(err);

			if(userData) {
				userData.subscriptions.push(req.param('roomid'));
				Users.update({id: req.param('userid')}, {subscriptions: userData.subscriptions}).exec(function(err, response) {
					if(err)	return console.log(err);

					if(response.length>=1) {
						return res.json(response[0]);
					}
					else {
						return res.status(501).json({error : "Subscription not updated, please try again"});
					}
				});
			}
			else {
				return res.status(404).json({error : "User not found"});
			}
		});
	}
};
