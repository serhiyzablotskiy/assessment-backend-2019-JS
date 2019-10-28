'use strict'

const models = require('../models')

class ApiOperation {
	constructor(modelName, parameters) {
		this.model = models[modelName]
		this.parameters = parameters
	}

	async initialize() {
		return Promise.resolve()
	}

	async beforeAction() {
		return Promise.resolve()
	}

	async action() {
		return Promise.resolve()
	}

	async afterAction() {
		return Promise.resolve()
	}

	async execute() {
		await this.initialize()
		await this.beforeAction()
		const response = await this.action()
		await this.afterAction()

		return response
	}
}

module.exports = ApiOperation
