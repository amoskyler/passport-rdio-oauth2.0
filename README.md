# passport-rdio-oauth2.0
[![Build Status](https://travis-ci.org/stevelacy/passport-rdio.png?branch=master)](https://travis-ci.org/stevelacy/passport-rdio)
[![NPM version](https://badge.fury.io/js/passport-rdio.png)](http://badge.fury.io/js/passport-rdio)

[rdio](https://rdio.com) authentication for [Passport](http://passportjs.org)


This module is based off [passport-github](https://github.com/jaredhanson/passport-github/)

## Install

```bash
$ npm install passport-rdio --save
```

## Usage

### Configure Strategy

rdio uses OAuth 2.0 tokens to authenticate a registered rdio user.
The returned `profile` contains the full rdio API user data.

```js

passport.use(new rdioStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: "/auth/rdio/callback"
},
function(accessToken, refreshToken, profile, done){

  User.findOrCreate({rdioId: profile.id}, function (err, user) {
    return done(err, user);
  });

}));

```

### Authenticate Requests

Using `express` or connect-like middleware, specify the auth type of `rdio`

```js

app.get('/auth/rdio', passport.authenticate('rdio'));

app.get('/auth/rdio/callback',
  passport.authenticate('rdio'), function(req, res){
    if (req.user){
      res.redirect('/');
    }
    else {
      res.redirect('/login');
    }
  }
);

```

## Examples

A full authentication example can be found [here](https://github.com/stevelacy/passport-rdio/tree/master/examples)

## Tests

```bash
$ npm install --dev
$ npm test
```

#License
The MIT License (MIT)

Copyright (c) 2014 Steve Lacy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
