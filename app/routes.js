var config = require('./config');
var gcal = require('./GoogleCalendar');

var ejs = require('ejs');
var fs = require('fs');

module.exports = function(app, passport) {

	// route for home page
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});



	// route for login form
	// route for processing the login form
	// route for signup form
	// route for processing the signup form

	// route for showing the profile page
	app.get('/profile', isLoggedIn, function(req, res) {
		
    console.log("entered profile");

    res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});

  });

    // route for logging out
    app.get('/logout', function(req, res) {
    	req.logout();
    	res.redirect('/');
    });

	// facebook routes
	// twitter routes

	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
	app.get('/auth/google', 
    passport.authenticate('google', { session: true }));


    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
      passport.authenticate('google', { session: true, failureRedirect: '/' }),

      function(req, res) { 
        req.session.access_token = req.user.accessToken;
        req.session.email = req.user._json.email;

        res.redirect('/gcal');
      });


    app.all('/gcal', function(req, res){

      if(!req.session.access_token) return res.redirect('/auth/google');

      //Create an instance from accessToken
      var accessToken = req.session.access_token;
      var id = req.session.email;

      gcal(accessToken).events.list(id, function(err, calendarList) {

        if(err) return res.send(500,err);

          // items 에 뭐가 있을까 :: console.log(calendarList.items);
          res.render('test.ejs', { items : calendarList.items } );
        });

      });

  };



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

  console.log("logged in");


}

