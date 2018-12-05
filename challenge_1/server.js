const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults({ static: './public' });

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON server running on port 3000.');
});
