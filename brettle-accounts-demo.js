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
  Template.userButton.helpers({
    userObject: function () {
      return EJSON.stringify(Meteor.user(), {
        indent: true
      });
    }
  });
  Template.userButton.onRendered(function () {
    var userButton = this;
    if (! this.popoverAndTrackerInited) {
      this.$('[data-toggle="popover"]').popover({
        template:
          '<div class="popover" role="tooltip">' +
            '<div class="arrow"></div><h3 class="popover-title"></h3>' +
            '<pre class="popover-content"></pre>' +
          '</div>',
      });

      Tracker.autorun(function () {
        Meteor.userId();
        userButton.$('a').addClass('new-user-id');
      });
      Tracker.autorun(function () {
        Meteor.user();
        userButton.$('a').addClass('new-user');
      });
      userButton.$('a').on('animationend', function () {
        $(this).removeClass('new-user new-user-id');
      });
      this.popoverAndTrackerInited = true;
    }
  });
}

Meteor.methods({
  deleteAccount: function () {
    Meteor.users.remove(this.userId);
  }
});
