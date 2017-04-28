/**
 * Chat.js
 *
 * @description :: Chat is the model that represents the conversations in various chatrooms
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
			type:'string',
			required:true
		},
  	message: {
  			type:'string',
  			required:true
  	},
    chatroom: {
        type:'string',
        required:true
    }
  }
};
