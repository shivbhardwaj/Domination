var mongoose = require('mongoose');
var User = mongoose.model('user');

module.exports = (function() {
	return {
		getUsers: function(req, res){
			User.find({}, function(err, users){
				if(err){
					console.log(err);
				} else {
					res.json(users);
				}
			})
		},

		addFriend: function(req, res){
			console.log(req.params.id)
			User.findOne({_id: req.params.id}, function(err,friend) {
				console.log(friend, 'THIS IS THE FRIEND')
				User.findOne({first_name: 'Neha'}, function(error, user){
				if(err){
					console.log('coudlnt find user in DB', err);
				} else {
					user._friends.push(friend);
					user.save(function(erro, result){
						if(erro){
							console.log('couldnt save user', erro);
						} else {
							console.log('updated user', result);
							res.json(result);
						}
					})
				}
				})
			})
			
		},


		getFriends: function(req,res) {
			User.findOne({first_name: 'Neha'}).populate('_friends').exec(function(err, user){
				if(err){return err}
				console.log('THIS ARE THE FRIENDS:', user._friends)
				res.json(user._friends)
			})
		},





		// getMongoose: function(req, res){
		// 	// this should probably be findOne isntead of find
		// 	mongooseDb.find({_id: req.params.id}, function(err, result){
		// 		if(err){
		// 			console.log("this is teh mongoose you are looking for", result);
		// 		} else {
		// 			console.log('this is our mongoose',result);
		// 			res.json(result);
		// 		}
		// 	})
		// },
		// updateMongoose: function(req, res){
		// 	mongooseDb.findOne({_id: req.params.id}, function(err, result){
		// 		if(err){
		// 			console.log('coudlnt find mongoose', err);
		// 		} else {
		// 			result.name = req.body.name;
		// 			result.weight = req.body.weight;
		// 			result.color = req.body.color;
		// 			result.save(function(err, result){
		// 				if(err){
		// 					console.log('couldnt save update mongoose', err);
		// 				} else {
		// 					console.log('foudn mongoose ', result);
		// 					res.json(result);
		// 				}
		// 			})
		// 		}
		// 	})
		// }
	}
})();