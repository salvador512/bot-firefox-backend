'use strict';

var User = require('./users.model');

var UserController = {
	home: home,
	createUser: createUser,
	getUser: getUser,
	getUsers: getUsers,
	updateUser: updateUser,
	deleteUser: deleteUser,
	getOneUserActive: getOneUserActive
}

function home(req, res) {
	return res.status(200).send({
		message: "Mensaje desde el controlador"
	})
}

function getOneUserActive(req,res) {
	res.setHeader('content-type', 'text/plain');
	var user = new User();
	User.findOneAndUpdate({status:true},{$set:{status:false}},{new: true},function(err, user) {
		if (err) {
			return res.status(500).send({
				message: 'Error al devolver el usuario'
			})
		}
		if (!user) {
			return res.status(404).send({
				message: 'No hay usuarios activos'
			})
		}		
		return res.status(200).send({
			user: [user]
		})		

	})
}

function createUser(req,res) {
	var user = new User();
	var body = req.body

	user.username = body.username;
	user.password = body.password;
	user.status = body.status;

	user.save(function(err, userStored) {
		if (err) {
			return res.status(500).send({
				message: 'Error al guardar el documento'
			})
		}if (!userStored) {
			return res.status(404).send({
				message: 'No se pudo guardar el documento'
			})

		}

		return res.status(200).send({
			user: userStored
		})
	})	
}

function getUser(req,res) {
	var userID = req.params.id;
		if (userID == null) {
			return res.status(404).send({
				message: 'El usuario no existe'
			})
		}	

	User.findById(userID,function(err, user) {
		if (err) {
			return res.status(500).send({
				message: 'Error al devolver el usuario'
			})
		}
		if (!user) {
			return res.status(404).send({
				message: 'El usuario no existe'
			})
		}		
		return res.status(200).send({
			user: user
		})		

	})
}

function getUsers(req,res) {
	User.find({}).sort('+username').exec(function(err, users) {
		if (err) {
			return res.status(500).send({
				message: 'Error al obtener usuarios'
			})
		}if (!users) {
			return res.status(404).send({
				message: 'No se pudo cargar la lista de usuarios'
			})

		}

		return res.status(200).send({
			user: users
		})		
	})
}

function updateUser(req,res) {
	var userId = req.params.id;
	var update = req.body;

	if (userId == null) {
		return res.status(404).send({
			message: 'El usuario no existe'
		})
	}		

	User.findByIdAndUpdate(userId, update,{new:true}, function(err, userUpdated) {
		if (err) {
			return res.status(500).send({
				message: 'Error al actualizar usuario'
			})
		}if (!userUpdated) {
			return res.status(404).send({
				message: 'No se pudo actualizar el usuario'
			})

		}

		return res.status(200).send({
			user: userUpdated
		})			
	})
}

function deleteUser(req,res) {
	var userId = req.params.id;

	if (userId == null) {
		return res.status(404).send({
			message: 'El usuario no existe'
		})
	}		

	User.findByIdAndRemove(userId, function(err, userRemoved) {
		if (err) {
			return res.status(500).send({
				message: 'Error al eliminar usuario'
			})
		}if (!userRemoved) {
			return res.status(404).send({
				message: 'No se pudo eliminar el usuario'
			})

		}

		return res.status(200).send({
			user: userRemoved
		})			
	})
}
module.exports = UserController;