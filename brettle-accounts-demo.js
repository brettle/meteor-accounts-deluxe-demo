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
        userButton.$('a').css('opacity', 0).animate({ opacity: 1 }, 1000);
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
