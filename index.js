const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile')

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// Get || Read

server.get('/zoos', (req, res) => {
  db.get('zoos')
    .then( get => {
      res.status(200).json(get);
    })
    .catch( err => {
      res.status(500).json(err);
    })
})

// Get By ID || Read By ID

server.get('/zoos/:id', (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then( get => {
      res.status(200).json(get)
    })
    .catch( err => {
      res.status(500).json(get);
    })
})

// Post || Create

server.post('/zoos', (req, res) => {
const animal = req.body;

  db.insert(animal)
    .into('/zoos')
    .then( ids => {
      res.status(201).json(ids[0]);
    })
    .catch( err => {
      res.status(500).json(err);
    })
})

// Put || Update

server.put('/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where('id' , '=' , id)
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch( err => {
      res.status(500).json(err);
    })
})

// Remove || Delete

server.delete('/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then( count => {
      res.status(200).json(count)
    })
    .catch( err => {
      res.status(500).json(err);
    })
})

const port = 9393;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
