/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  	attributes: require('waterlock').models.user.attributes({
  
	  	name: {
	  		type: 'string'
	  	},
	  	title: {
	  		type: 'string'
	  	},
	  	type: {
	  		type: 'string',
	  		enum: ['admin', 'user'],
	  		defaultsTo: 'user'
	  	},
	  	password: {
	  		type: 'string'
	  	},
	  	email: {
	  		type: 'string'
	  	}
  	}),

  	beforeCreate: require('waterlock').models.user.beforeCreate,
  	beforeUpdate: require('waterlock').models.user.beforeUpdate,


   /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    // Create a user
    User.create({
      name: inputs.name,
      email: inputs.email,
      type: inputs.type,
      title: inputs.title,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
  },


  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      email: inputs.email,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
  }
  
  
};
