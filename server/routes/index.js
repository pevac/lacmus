const express = require('express');
const path = require('path');

const clients = require('./clients');
const clientsFilePath = './server/data/clients.json';
const usersFilePath = './server/data/user.json';
const auth = require('./auth');

module.exports = function(app) {
  clients(app, clientsFilePath);
  auth(app, usersFilePath);
};


