// Place your service configuration data in your settings.json file  like this:
/*
{
  "loginServices": {
    "google": {
      "clientId": "XXXXXXXXXXXXXXXXX",
      "loginStyle": "popup",
      "secret": "XXXXXXXXXXXXXXXXX"
    }
  }
}
*/

_.each(Meteor.settings.loginServices, function(val, key) {
  ServiceConfiguration.configurations.upsert({ service: key }, { $set: val });
});
