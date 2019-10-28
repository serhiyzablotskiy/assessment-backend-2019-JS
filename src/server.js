const config           = require('config')
const express          = require('express')
const mongoose         = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
const graphql          = require('./graphql')
mongoose.Promise       = global.Promise

const { seedUsers } = require('./db-init')
const { schema: typeDefs, resolvers } = graphql

mongoose.connect(config.get('db.uri'), { useNewUrlParser: true })
  .then(async () => {
    console.log('INFO: Connected to the database')

    await seedUsers()

    const server = new ApolloServer(graphql)

    const app = express()
    server.applyMiddleware({ app })

    const { host, port } = config.get('server')

    app.listen({ port }, () => {
      console.log(`Server ready at http://${ host }:${ port }${ server.graphqlPath }`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(-1)
  })
