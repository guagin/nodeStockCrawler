import 'regenerator-runtime/runtime'

import fastify from 'fastify'

import { makeFetchAnueNews } from 'anue'

const server = fastify({ logger: true })

server.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

const fetchAnueNews = makeFetchAnueNews({})

server.get('/anue', async (request, reply) => {
  reply.type('application/json').code(200)
  return fetchAnueNews()
})

server.listen(3000, (err, address) => {
  if (err) throw err
  server.log.info(`server listening on ${address}`)
})
