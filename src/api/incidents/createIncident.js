'use strict'

const { User: UserModel } = require('../../models')
const { ApiOperation, Errors } = require('../../lib')
const { IncidentService, UserService } = require('../../services')

class CreateIncident extends ApiOperation {
	constructor(parameters) {
		super('Incident', parameters)
		this.incidentService = new IncidentService(this.model)
	}

	_validateParameters() {
		const { incident } = this.parameters
		const { title, status } = incident

		const isTitleValid = title && title.length > 0
		if (!isTitleValid) throw Errors.InvalidParametersError('An incident should have a title')
	}

	beforeAction() {
		this._validateParameters()
	}

	async action() {
		const userService = new UserService(UserModel)
		const engineer = await userService.getEngineer()

		if (!engineer) throw Errors.NotFoundError('There is no user with engineer role')

		const { incident } = this.parameters
		const { _id: assignee } = engineer
		const status = 'Created'
		const incindentParameters = { ...incident, assignee, status }

		return this.incidentService.createIncident(incindentParameters)
	}
}


module.exports = CreateIncident
