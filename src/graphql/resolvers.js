'use strict'

const api = require('../api')
const schema = require('./schema')
const { ResolversBuilder } = require('../lib')

const resolversBuilder = new ResolversBuilder(schema, api)
module.exports = resolversBuilder.buildResolvers()
