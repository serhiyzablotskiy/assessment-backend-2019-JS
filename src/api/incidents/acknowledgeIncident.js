'use strict'

const { ApiOperation, Errors } = require('../../lib')
const { IncidentService } = require('../../services')

class AcknowledgeIncident extends ApiOperation {
	constructor(parameters) {
		super('Incident', parameters)
		this.incidentService = new IncidentService(this.model)
	}

	_validateParameters() {
		const { id } = this.parameters

		const isIdValid = IncidentService.isIdValid(id)
		if (!isIdValid) throw Errors.InvalidParametersError(`ObjectId can not be represented by ${id}`)
	}

	async _validateIncident() {
  	const { id } = this.parameters
  	const incident = await this.incidentService.getIncident(id)

  	if (!incident) throw Errors.NotFoundError('An incident with passed id was not found')
  }

	async beforeAction() {
		this._validateParameters()
		await this._validateIncident()
	}

	async action() {
		const { id } = this.parameters
		return this.incidentService.acknowledgeIncident(id)
	}
}


module.exports = AcknowledgeIncident
