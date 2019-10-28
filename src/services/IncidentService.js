'use strict'

const mongoose = require('mongoose')

class IncidentService {
	constructor(IncidenModel) {
		this.IncidenModel = IncidenModel
	}

	static availableStatuses = ['Created', 'Acknowledged', 'Resolved']

	static isIdValid(id) {
		return mongoose.Types.ObjectId.isValid(id)
	}

	static isStatusValid(status) {
		return IncidentService.availableStatuses.includes(status)
	}

	getIncident(_id) {
		return this.IncidenModel.findOne({ _id })
	}

	createIncident({ title, assignee, status, description }) {
		return this.IncidenModel.create({ title, assignee, status, description })
	}

	deleteIncident(_id) {
		return this.IncidenModel.deleteOne({ _id })
	}

	countIncidents() {
		return this.IncidenModel.countDocuments()
	}

	getIncidents({ offset, limit }) {
		return this.IncidenModel.find().skip(offset).limit(limit)
	}

	async acknowledgeIncident(_id) {
		await this.IncidenModel.updateOne({ _id }, { status: 'Acknowledged' })
		return this.getIncident(_id)
	}

	async resolveIncident(_id) {
		await this.IncidenModel.updateOne({ _id }, { status: 'Resolved' })
		return this.getIncident(_id)
	}

	async assigneIncident(_id, assignee) {
		await this.IncidenModel.updateOne({ _id }, { assignee })
		return this.getIncident(_id)
	}
}

module.exports = IncidentService
