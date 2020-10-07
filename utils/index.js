const chalk = require('chalk');
const boxen = require('boxen');
const constants = require('../constants');
const { boxenOptions } = constants;

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

module.exports = { cls, displayMessageBox, snakeToCamel };
