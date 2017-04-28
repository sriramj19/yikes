/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * @description		Create a new chat
	 * @author				Sriram Jayaraman <sriramemailsyou@gmail.com>
	 *
	 * @api 					{post} || {get} /addConversation Create new chat
	 * @apiName 			addConversation
	 * @apiGroup 			chat
   * @apiParam			{String} user 	 Username of the user sending the message
	 * @apiParam			{String} message The message
	 * @apiParam			{String} chatroom The name of the chatroom
	 * @apiSuccess 		{Object} creates chat and publishes to all active listeners
	 */
	addConversation:function (req,res) {
		var chatDetails = req.params.all();
		if(req.isSocket && req.method === 'POST'){
			//New message from connected client
			Chat.create(chatDetails).exec(function(err,response){
				if(err)	return console.log(err);

				//Broadcast to all active listeners
				if(response) {
					Chat.publishCreate({id : response.id, chatroom : response.chatroom,message : response.message , user : response.user, createdAt : response.createdAt });
				}
			});
		}
		//Subscribe user if POST method not called by socket
		else if(req.isSocket){
			Chat.watch(req.socket);
			console.log( '--> Subscription Active : ' + req.socket.id + ' <--' );
		}
	}

};
