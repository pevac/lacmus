const express = require('express');
const path = require('path');

const clients = require('./clients');
const clientsFilePath = './server/data/clients.json';

module.exports = function(app) {
  clients(app, clientsFilePath);
};


