'use strict';

var app = angular.module('app',[]);
/* Chats Controller */ /*Invloves all chat processing and chatroom activities*/

app.controller('ChatController',
  ['$http', '$scope', '$localStorage', 'ChatService',
   function($http, $scope, $localStorage, ChatService){

  $scope.chatData =[];  //Consists of all Chat data for all the chat rooms of specified user
  $scope.currentChatRoom = {}; //The chat room currently using
  $scope.chats = []; //Chats persisting to the current chat room
  $scope.chatUser = _.clone($localStorage.userDetails.name); //Current user
  $scope.chatMessage="";

  //Called when dashboard is loaded
  $scope.initChat = function() {
    $scope.getAllchat();
  }

  //Get all chatrooms and sets default chatroom
  $scope.getAllChatRooms = function() {
    ChatService.chatRooms($scope.app.apiURL).then(function(response) {
      $scope.currentChatRoom = _.clone(response[0]);
      $scope.setCurrentChatRoom($scope.currentChatRoom);
      $scope.chatRoomData = _.clone(response);
    });
  }

  //Adds chatroom input to the DOM
  $scope.addChatRoom = function() {
    document.getElementById('generateChatRoom').style.display = 'inline';
    document.getElementById('addChatRoom').style.display = 'none';
  }

  //Add new chatroom
  $scope.generateChatRoom = function() {
    ChatService.newChatRoom($scope.app.apiURL, $scope.additionalRoomName, $localStorage.userDetails.name).then(function(response) {
      if(response) {
        $scope.chatRoomData.push(response);
        $localStorage.userDetails.subscriptions.push(response.id);
        $scope.additionalRoomName = "";
        document.getElementById('generateChatRoom').style.display = 'none';
        document.getElementById('addChatRoom').style.display = 'inline';
      }
    });
  }

  //Clear DOM when focus leaves text field
  $scope.resetAddChat = function() {
    document.getElementById('generateChatRoom').style.display = 'none';
    document.getElementById('addChatRoom').style.display = 'inline';
  }

  //Set the current chat room and its chat data
  $scope.setCurrentChatRoom = function(currentChatRoom) {
    var flag = false;
    ChatService.getUserSubscriptions($scope.app.apiURL, $localStorage.userDetails.id).then(function(response) {
      _.forEach(response.subscriptions, function(value) {
        if(value === currentChatRoom.id) {
          flag = true;
        }
      });
      if($localStorage.userDetails.subscriptions !== response.subscriptions) {
        $localStorage.userDetails.subscriptions = _.clone(response.subscriptions);
      }
      //View a subscribed chatroom
      if(flag) {
        $scope.currentChatRoom = _.clone(currentChatRoom);
        $scope.chats=[];
        _.forEach($scope.chatData, function(value) {
          if(value.chatroom == $scope.currentChatRoom.id) {
            $scope.chats.push(value);
          }
        });
        if(!$scope.chats.length) {
          alert('It seems lonely here, start a new conversation');
        }
      }
      //Else Subscribe and go into chatroom
      else {
        var confirmation = confirm('You are not subscribed to this chatroom... Do you wish to subscribe?');
        if(confirmation) {
          ChatService.subscribe($scope.app.apiURL, $localStorage.userDetails.id, currentChatRoom.id).then(function(response) {
            if(response) {
              $localStorage.userDetails.subscriptions.push(currentChatRoom.id);
              $scope.currentChatRoom = _.clone(currentChatRoom);
              $scope.chats=[];
              _.forEach($scope.chatData, function(value) {
                if(value.chatroom == $scope.currentChatRoom.id) {
                  $scope.chats.push(value);
                }
              });
            }
          });
        }
      }
    });
  }

  //Get all chat records and start listening to the server for changes
  $scope.getAllchat = function(){
    io.socket.get('/chat/addConversation/');
    ChatService.userChat($scope.app.apiURL).then(function(response) {
      $scope.chatData = response;
      $scope.getAllChatRooms();
      $scope.app.userDetails = _.clone($localStorage.userDetails);
    });
  }

  //Event triggered when a change occurs in the server
  io.socket.on('chat',function(obj){
    if(obj.verb === 'created'){
      $scope.chatData.push(obj.data);
      if(obj.data.chatroom === $scope.currentChatRoom.id) {
        $scope.chats.push(obj.data);
      }
      $scope.$digest();
    }
  });

  //Add a new conversation
  $scope.sendMessage = function(){
    io.socket.post($scope.app.apiURL + 'chat/addConversation',{user:$scope.chatUser,message: $scope.chatMessage, chatroom: $scope.currentChatRoom.id});
    $scope.chatMessage = "";
  };
}]);
