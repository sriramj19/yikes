/**
 * Users.js
 *
 * @description :: Users model stores user data including active subscriptions
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    subscriptions : {
      type: 'array',
      defaultsTo: ['5903af936a2a75900b3ccd50']                                  //Replace with id of default chatroom
    }
  }
};
