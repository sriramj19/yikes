/**
 * Chatroom.js
 *
 * @description :: TODO: Chatroom is the model that stores chatroom information
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    roomName : {
      type: 'string',
      required: true
    },
    createdBy : {
      type: 'string',
      required: true
    }
  }
};
