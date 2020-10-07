const chalk = require('chalk');
const boxen = require('boxen');
const templates = require('./templates');
const constants = require('../constants');
const { boxenOptions } = constants;
const { generateReducer } = templates;

function createMessage(message) {
  return chalk.white.bold(message);
};

function displayMessageBox(message) {
  console.log(boxen(createMessage(message), boxenOptions));
};

function cls() {
  console.clear();
}

function snakeToCamel(snake) {
  return snake.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('_', '')
  );
}

function genericFileName(actionsPath) {
  let name = actionsPath.split("/");
  return name[name.length - 1].split(".")[0];
}

function directoryPath(actionsPath) {
  let path = actionsPath.split("/");
  path.length =  path.length - 1;
  return path.join("/");
}

module.exports = { cls, displayMessageBox, snakeToCamel, generateReducer, genericFileName, directoryPath };
