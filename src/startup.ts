import 'regenerator-runtime/runtime'

import fastify from 'fastify'

import { makeFetchNews } from 'yahoo'

const server = fastify({ logger: true })

server.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

server.get('/hello', async (request, reply) => {
  reply.type('application/json').code(200)
  const fetchNews = makeFetchNews({})
  return fetchNews()
})

server.listen(3000, (err, address) => {
  if (err) throw err
  server.log.info(`server listening on ${address}`)
})
