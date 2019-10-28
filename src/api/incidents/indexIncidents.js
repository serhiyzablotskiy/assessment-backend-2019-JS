'use strict'

const { ApiOperation } = require('../../lib')
const { IncidentService } = require('../../services')

class IndexIncidents extends ApiOperation {
	constructor(parameters) {
		super('Incident', parameters)
		this.incidentService = new IncidentService(this.model)
	}

	async action() {
		const { limit = 10, offset = 0 } = this.parameters;

		const count = await this.incidentService.countIncidents()
		const incidents = await this.incidentService.getIncidents({ limit, offset })

		return { records: incidents, metadata: { limit, offset, count} }
	}
}


module.exports = IndexIncidents
