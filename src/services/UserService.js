'use strict'

const mongoose = require('mongoose')

class UserService {
	constructor(UserModel) {
		this.UserModel = UserModel
	}

	static isIdValid(id) {
		return mongoose.Types.ObjectId.isValid(id)
	}

	getEngineer() {
		return this.UserModel.findOne({ role: 'Engineer' })
	}

	getUser(_id) {
		return this.UserModel.findOne({ _id })
	}
}

module.exports = UserService
