/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
module.exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {};
  profile.provider = 'rdio';
  profile.id = String(json.key);
  profile.firstName = json.firstName;
  profile.url = json.url;
  profile.icon = json.icon;
  profile._raw = JSON.stringify(json);
  profile._json = json;

  return profile;
};
