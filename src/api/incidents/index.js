'use strict'

const readIncident 				= require('./readIncident')
const indexIncidents 			= require('./indexIncidents')
const createIncident 			= require('./createIncident')
const assignIncident 			= require('./assignIncident')
const deleteIncident 			= require('./deleteIncident')
const resolveIncident 		= require('./resolveIncident')
const acknowledgeIncident = require('./acknowledgeIncident')

module.exports = {
	readIncident,
	indexIncidents,
	createIncident,
	assignIncident,
	deleteIncident,
	resolveIncident,
	acknowledgeIncident,
}
