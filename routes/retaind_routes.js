var eatAuth = require(__dirname + '/../lib/eat_auth');
var express = require('express');
var User = require(__dirname + '/../models/user');
var retaindRoute = module.exports = exports = express.Router();
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');


// Accepts a JSON object like: {pInfo: {fullName: 'Bert Mert',email: 'b.mert@pert.com',phone: '3603603600',location: 'Seattle, WA',timezone: 'PST (UTC−08:00)',currentLogin: 'the token?'}}
// Stores JSON object in an array. can access with user.pInfo[0]
retaindRoute.post('/personal', jsonParser, eatAuth, function(req, res) {
  User.findOneAndUpdate({ username: req.user.username },
  { $push: {pInfo: req.body.pInfo}},
  function(err, doc) {
    if (err) handleError(err);
  });
  return res.end();
});

retaindRoute.put('/change_remindr', jsonParser, function(req, res) {
  console.log(req.body);
})

