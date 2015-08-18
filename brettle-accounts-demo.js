if (Meteor.isClient) {
  Template.home.helpers({
    userObject: function() {
      return EJSON.stringify(Meteor.user(), {
        indent: true
      });
    }
  });
  Template.private.events({
    "click .delete-account": function() {
      Meteor.call('deleteAccount');
    }
  });
}

Meteor.methods({
  deleteAccount: function() {
    Meteor.users.remove(this.userId);
  }
});
