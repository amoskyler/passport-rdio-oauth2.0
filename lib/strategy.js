/**
 * Module dependencies.
 */
var util = require('util');
var OAuth2Strategy = require('passport-oauth2');
var Profile = require('./profile');
var InternalOAuthError = require('passport-oauth2').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * This code is based off passport-cloudup by stevelacy
 *
 *
 * The Rdio authentication strategy authenticates requests by delegating to
 * Rdio using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Rdio application's App ID
 *   - `clientSecret`  your Rdio application's App Secret
 *   - `callbackURL`   URL to which Rdio will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new RdioStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: '/auth/Rdio/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.rdio.com/oauth2/authorize';
  options.tokenURL = options.tokenURL || 'https://www.rdio.com/oauth2/token';
  options.scopeSeparator = options.scopeSeparator || ',';
  options.customHeaders = options.customHeaders || {};
  if (!options.customHeaders['User-Agent']) {
    options.customHeaders['User-Agent'] = options.userAgent || 'passport-rdio';
  }

  OAuth2Strategy.call(this, options, verify);
  this.name = 'rdio';
  this._userProfileURL = options.userProfileURL || 'https://www.rdio.com/api/1/';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


Strategy.prototype.userProfile = function(token, done) {
  this._oauth2._useAuthorizationHeaderForGET = true;
  this._oauth2.post(this._userProfileURL, token, 'method=currentUser', function (err, body, res) {
    if (err) {
      return done(new InternalOAuthError('failed to fetch user profile', err));
    }

    try {
      var json = JSON.parse(body);
      var profile = Profile.parse(json.result);

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
