import Fastify from 'fastify';

const app = Fastify({
  logger: true
});

// Declare a route
app.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
});

export default app;