/**
 * ChatroomController
 *
 * @description :: Server-side logic for managing chatrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * @description		Create a new Chat Room
	 * @author				Sriram Jayaraman <sriramemailsyou@gmail.com>
	 *
	 * @api 					{post} /createRoom Create Chat Rooms
	 * @apiName 			createChatRoom
	 * @apiGroup 			chatroom
   * @apiParam			{String} userName The userName of the user who created the chatroom
   * @apiParam			{String} roomName The name of the chatroom
	 * @apiSuccess 		{Object} returns the chatroom details and auto-subscribes creator
	 */
	createChatRoom : function(req, res) {
		Chatroom.findOne({roomName : req.param('roomName')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.status(409).json({error : "Sorry, Chatroom already exists"});
			}
			else {
				Chatroom.create({roomName : req.param('roomName'), createdBy : req.param('userName')}).exec(function(err, response) {
					if(err)	return console.log(err);

					if(response) {
						//Auto-Subscribe Creator
						Users.findOne({name: response.createdBy}).exec(function(err, userData) {
							if(err)	return console.log(err);

							if(userData) {
								userData.subscriptions.push(response.id);
								Users.update({name : response.createdBy}, {subscriptions : userData.subscriptions}).exec(function(err, subscribed) {
									if(err)	return console.log(err);

									if(subscribed.length>=1) {
										console.log('--> ' + subscribed[0].name + ' is subscribed to ' + response.roomName + ' <--');
									}
								});
							}
						});
						return res.json(response);
					}
				});
			}
		});
	},

	/**
	 * @description		Create a new Chat Room
	 * @author				Sriram Jayaraman <sriramemailsyou@gmail.com>
	 *
	 * @api 					{get} /rooms Get all chatrooms
	 * @apiName 			getAllChatRooms
	 * @apiGroup 			chatroom
	 * @apiSuccess 		{Object} returns all chatrooms
	 */
	getAllChatRooms : function(req, res) {
		Chatroom.find({}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
		});
	}
};
