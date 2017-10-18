	/**
	 * UserController.js 
	 * 
	 * @module      :: Controller
	 * @description :: Provides the base user
	 *                 actions used to make waterlock work.
	 *                 
	 * @docs        :: http://waterlock.ninja/documentation
	 */

	 module.exports = require('waterlock').actions.user({
	  /* e.g.
	    action: function(req, res){
	  
	    }
	    */


	 	/**
	   * `UserController.login()`
	   */
	   login: function (req, res) {

		    // See `api/responses/login.js`
		    return res.login({
		    	email: req.param('email'),
		    	password: req.param('password'),
		    	successRedirect: '/',
		    	invalidRedirect: '/login'
		    });
		},


	  /**
	   * `UserController.logout()`
	   */
	   logout: function (req, res) {

		    // "Forget" the user from the session.
		    // Subsequent requests from this user agent will NOT have `req.session.me`.
		    req.session.me = null;

		    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
		    // send a simple response letting the user agent know they were logged out
		    // successfully.
		    if (req.wantsJSON) {
		    	return res.ok('Logged out successfully!');
		    }

		    // Otherwise if this is an HTML-wanting browser, do a redirect.
		    return res.redirect('/');
		},


	   /**
	   * `UserController.signup()`
	   */
	    signup: function (req, res) {
		   	var params = waterlock._utils.allParams(req); 
		   	var auth = {
		   		email: params.email, 
		   		password: params.password
		   	}; 
		   	// delete(params.email); 
		   	// delete(params.password); 
		   	User.create(params).exec(function(err,  user){
		   		if(err){
		   			console.log(err); 
		   		}
		   		waterlock.engine.attachAuthToUser(auth, user, function(err, ua){
		   			console.log(ua);
		   			if(err){
		   				res.json(err); 
		   			}else{
		   				waterlock.cycle.loginSuccess(req, res, ua); 
		   			}
		   		}); 
		   	})



		    // Attempt to signup a user using the provided parameters
		  //   User.signup({
		  //   	name: req.param('name'),
		  //   	email: req.param('email'),
		  //   	password: req.param('password'),
		  //   	type: req.param('type'),
		  //   	title: req.param('title'),
		  //   }, function (err, user) {
		  //     // res.negotiate() will determine if this is a validation error
		  //     // or some kind of unexpected server error, then call `res.badRequest()`
		  //     // or `res.serverError()` accordingly.
		  //     if (err) return res.negotiate(err);

		  //     // Go ahead and log this user in as well.
		  //     // We do this by "remembering" the user in the session.
		  //     // Subsequent requests from this user agent will have `req.session.me` set.
		  //     req.session.me = user.id;

		  //     // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
		  //     // send a 200 response letting the user agent know the signup was successful.
		  //     if (req.wantsJSON) {
		  //     	return res.ok('Signup successful!');
		  //     }

		  //     // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
		  //     return res.redirect('/welcome');
		  // });
		}
	});