if (Meteor.isClient) {
  Session.setDefault('uiPkg', 'accounts-ui');
  Template.registerHelper("useUserAccounts", function(argument){
    return (Session.get('uiPkg') === 'useraccounts');
  });
  Template.nav.events({
    "click .delete-account": function () {
      Meteor.call('deleteAccount');
    },
    'change #ui-selector': function (event) {
      Session.set('uiPkg', event.target.value);
    }
  });
  Template.nav.helpers({
    userObject: function () {
      return "<pre>" + EJSON.stringify(Meteor.user(), {
        indent: true
      }) + "</pre>";
    }
  });
  Template.nav.onRendered(function () {
    if (! this.popoversInited) {
      this.$('[data-toggle="popover"]').popover({
        html: true,
      });
      this.popoversInited = true;
    }
  });
}

Meteor.methods({
  deleteAccount: function () {
    Meteor.users.remove(this.userId);
  }
});
