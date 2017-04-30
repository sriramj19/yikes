'user strict';

var app = angular.module('app');
/* Chats Service */

app.factory('ChatService', function($http) {
  return {
    //API call for loading all chats
    userChat: function(url, name) {
      return $http.get(url + 'chat').then(function(response) {
        return response.data
      }, function(x) {
        console.log(x.data);
      });
    },
    //API call for retrieving all chat rooms
    chatRooms: function(url) {
      return $http.get(url + 'rooms').then(function(response) {
        return response.data;
      }, function(x) {
        console.log(x.data);
      });
    },
    //API Call for generating new chatroom
    newChatRoom: function(url, roomName, userName) {
      return $http.post(url + 'createRoom', {roomName : roomName, userName : userName}).then(function(response) {
        return response.data;
      }, function(x) {
        alert(x.data.error);
      });
    },
    //API Call for subscribing user to a chatroom
    subscribe: function(url, userid, roomid) {
      return $http.post(url + 'users/subscribe', {userid: userid, roomid: roomid}).then(function(response) {
        return response.data;
      }, function(x) {
        alert(x.data.error)
      });
    },
    //API Call for retrieving user's current subscriptions
    getUserSubscriptions: function(url, userid) {
      return $http.get(url + 'users/subscriptions/' + userid).then(function(response) {
        return response.data;
      }, function(x) {
        alert('There seems to be a problem, kindly try again later');
      });
    }
  }
});
