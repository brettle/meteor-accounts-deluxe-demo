if (Meteor.isClient) {
  Template.home.helpers({
    userObject: function() {
      return EJSON.stringify(Meteor.user(), {
        indent: true
      });
    }
  });
}
