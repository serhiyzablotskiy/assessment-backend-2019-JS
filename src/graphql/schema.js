'use strict'

const { gql } = require('apollo-server-express')

const schema = gql`
	enum IncidentStatus {
		Created
		Acknowledged
		Resolved
	}

	input IncidentInput {
		title: String!,
		description: String
	}

	type PaginationMetadata {
		limit: Int!,
		offset: Int!,
		count: Int!
	}

	type IndexIncidentResponse {
		records: [Incident]!,
		metadata: PaginationMetadata!
	}

	type Incident {
		_id: String!
		title: String!
		description: String
		assignee: String!
		status: IncidentStatus!
	}

	type DeleteStatus {
		isSuccess: Boolean
	}

	type Query {
	  indexIncidents(limit: Int = 10, offset: Int = 0): IndexIncidentResponse
	  readIncident(id: String!): Incident
	}

	type Mutation {
		acknowledgeIncident(id: String!): Incident
		assignIncident(id: String!, assignee: String!): Incident
		createIncident(incident: IncidentInput!): Incident
		deleteIncident(id: String!): DeleteStatus
		resolveIncident(id: String!): Incident
	}
`

module.exports = schema
