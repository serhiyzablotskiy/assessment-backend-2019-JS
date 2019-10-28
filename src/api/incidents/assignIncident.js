'use strict'

const { ApiOperation, Errors } = require('../../lib')
const { User: UserModel } = require('../../models')
const { IncidentService, UserService } = require('../../services')

class AssignIncident extends ApiOperation {
	constructor(parameters) {
		super('Incident', parameters)
		this.incidentService = new IncidentService(this.model)
	}

	_validateParameters() {
		const { id, assignee } = this.parameters

		const isIdValid = IncidentService.isIdValid(id)
		if (!isIdValid) throw Errors.InvalidParametersError(`ObjectId can not be represented by ${id}`)

		const isAssigneeValid = UserService.isIdValid(assignee)
		if (!isAssigneeValid) throw Errors.InvalidParametersError(`ObjectId can not be represented by ${assignee}`)
	}

	async _validateAssignee() {
		const { assignee } = this.parameters
		const userService = new UserService(UserModel)

		const user = await userService.getUser(assignee)
		if (!user) throw Errors.NotFoundError('There is no user with passsed id')
	}

  async _validateIncident() {
  	const { id } = this.parameters
  	const incident = await this.incidentService.getIncident(id)

  	if (!incident) throw Errors.NotFoundError('An incident with passed id was not found')
  }

	async beforeAction() {
		this._validateParameters()
		await this._validateAssignee()
		await this._validateIncident()
	}

	async action() {
		const { id, assignee } = this.parameters
		return this.incidentService.assigneIncident(id, assignee)
	}
}


module.exports = AssignIncident
