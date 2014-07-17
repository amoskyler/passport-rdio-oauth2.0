var CloudupStrategy = require('../lib/strategy');

describe('Strategy:userProfile', function() {

  var strategy =  new rdioStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    },
    function() {});

  strategy._oauth2.post = function(token, done) {
    if (url != 'https://api.cloudup.com/user') { return callback(new Error('wrong url argument')); }
    if (accessToken != 'token') { return done(new Error('wrong token argument')); }

    var body = '{ id": 1, "firstName": "monalisa", "icon": "http://api.rdio.com/1"}';

    done(null, body, undefined);
  };

  describe('loading profile', function() {
    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('cloudup');

      expect(profile.id).to.equal('1');
      expect(profile.username).to.equal('octocat');
      expect(profile.name).to.equal('monalisa octocat');
      expect(profile.avatar).to.equal('https://i.cloudup.com/i1');
    });

    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });

    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  });

  describe('encountering an error', function() {
    var err, profile;

    before(function(done) {
      strategy.userProfile('wrong-token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });

    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
    });

    it('should not load profile', function() {
      expect(profile).to.be.undefined;
    });
  });

});
