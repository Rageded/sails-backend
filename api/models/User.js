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
	  	}
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
