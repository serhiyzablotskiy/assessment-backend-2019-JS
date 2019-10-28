const { ApolloError } = require('apollo-server-express')

const InvalidParametersError = (message = 'Invalid parameters') => {
	return new ApolloError(message, 400)
}

const NotFoundError = (message = 'A data record was not found') => {
	return new ApolloError(message, 404)
}

const OperationError  = (message = 'Operation cannot be processed') => {
	return new ApolloError(message, 401)
}

module.exports = {
	NotFoundError,
	OperationError,
	InvalidParametersError
}
