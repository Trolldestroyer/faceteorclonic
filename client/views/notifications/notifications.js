import { Session } from 'meteor/session'
/**
 * @isMethod true
 * @memberOf Method
 * @function events
 * @summary metodo con el cual usamos el evento de accept o refuse para aceptar o rechazar la peticion de amistad.
 * @locus notifications
 * @param {Object} [clickdUser] Guardamos el usuario que a clicado para aceptar o rechazar. 
 * @param {Object} [userid] Es dondo guardamos la id del usuario.
 */
Template.notifications.events({
    'click .accept':function(e){
      var clickedUser = Blaze.getData(e.currentTarget);
      var userid = Meteor.user()._id;
      Meteor.call('users.acceptFriendRequest',userid,clickedUser);
    },
    'click .refuse':function(e){
         var clickedUser = Blaze.getData(e.currentTarget);
         var userid = Meteor.user()._id;
         Meteor.call('users.removeFriendRequest',userid,clickedUser);

    },
})

Template.notifications.helpers({
  /**
 * @isMethod true
 * @memberOf Method
 * @function friendRequests
 * @summary Esta function nos retorna los usuarios que espera que respondas a la solicitud.
 * @locus notifications
 * @param {Object} [user] Es dondo guardamos el usuario que quiere saber sus solicitedes.
 */
    friendRequests:function(){
        var user = Meteor.user();
        return user.profile.pendingFriends;
    },
 /**
 * @isMethod true
 * @memberOf Method
 * @function friendPicture
 * @summary Esta function nos retorna la pic del friend.
 * @locus notifications
 * @param {Object} [friendpic] Es dondo guardamos el nombre modificado del amigo introducido añadientole pic al nombre.
 * @param {Object} [username] Es dondo guardamos y modificamos la session para despues obtener la pic.
 */
    friendPicture:function(friend) {
      var friendpic = friend+'_pic';
      var username =  Meteor.call('users.friendsrc',friend, function(error, result) {
                          Session.set(friendpic,result);
                      });

      return Session.get(friendpic);
    },
  /**
 * @isMethod true
 * @memberOf Method
 * @function friendName
 * @summary Esta function nos retorna el usuario con la id solicitada.
 * @locus notifications
 * @param {Object} [user] Es dondo guardamos el usuario amigo solicitado.
 */
    friendName:function(friend) {
        var user = Meteor.users.findOne({_id:friend});
        return user ? user.profile.name.first + " " + user.profile.name.last : null;
    },
    /**
 * @isMethod true
 * @memberOf Method
 * @function friendAddress
 * @summary Esto nos retorna la inforacion de localizacion de la persona.
 * @locus notifications
 * @param {Object} [user] Es dondo guardamos el usuario amigo del que queremos saber la localizacion.
 */
    friendAddress:function(friend, address) {
        var user = Meteor.users.findOne({_id:friend});
        switch (address) {
            case 0:
                return user ? user.profile.location.street : "";
                break;
            case 1:
                return user ? user.profile.location.city + ", " + user.profile.location.state + " " + user.profile.location.zip : "";
                break;
        }
    },
 /**
 * @isMethod true
 * @memberOf Method
 * @function friendUsername
 * @summary Esto nos retorna el nombre del amigo.
 * @locus notifications
 * @param {Object} [user] Es dondo guardamos el nombre del usuario amigo añadiendo _name.
 */
    friendUsername:function(friend) {
      var friendname = friend+'_name';
      Meteor.call('users.FriendName',friend, function(error, result) {
         Session.set(friendname,result);
         return result;
      });
      return Session.get(friendname);
   }
})
