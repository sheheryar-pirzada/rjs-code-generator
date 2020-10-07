const prompt = require('prompt-sync')();
const fs = require('fs');
const os = require('os');
const utils = require('./utils');

const { cls, displayMessageBox, snakeToCamel, generateReducer, genericFileName, directoryPath } = utils;

let actionsFilePath;
let actions = [];
let actionConstants = [];
let actionMethods = [];
let genericName = '';
let _directoryPath = '';

cls();
getActionsFile();

function getActionsFile() {
  displayMessageBox("Speciify the path to your .actions file");
  actionsFilePath = prompt();

  genericName = genericFileName(actionsFilePath);
  _directoryPath = directoryPath(actionsFilePath);

  displayMessageBox(`Provided Path: ${actionsFilePath}`);
  if (actionsFilePath && typeof actionsFilePath === "string") {
    readFile(actionsFilePath);
  }
};

function readFile(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (!err) {
      //actions file
      actions = data.split(os.EOL);
      generateReducer(actions, actionsFilePath);
      generateConstants(actions);
      generateMethods(actions);
      writeFile(actionsFilePath, [...actionConstants, ...actionMethods]);
      displayMessageBox("Actions file Successfully Created!");

      //reducer file
      writeFile(`${_directoryPath}/${genericName}.reducer.js`, generateReducer(actions, actionsFilePath));
      displayMessageBox("Reducers file Successfully Created!");
    } else {
      console.log(err);
    }
  });
}

function generateConstants(actions) {
  if (actions && actions.length) {
    actions.forEach(function (action, index) {
      actionConstants.push(`export const ${action} = '${action}';`);
    });
  }
};

function generateMethods(actions) {
  if (actions && actions.length) {
    actions.forEach(function (action) {
      const func = `export const ${snakeToCamel(action)} = () => ({\ntype: ${action},\n});\n`;
      actionMethods.push(func);
    });
  }
}

function writeFile(path, content) {
  fs.writeFileSync(path, `// Auto Generated File\n`, { encoding: 'utf8', flag: 'w' });
  content && content.length && content.forEach(function (line) {
    fs.appendFileSync(path, `${line}\n`, { encoding: 'utf8', flag: "a" });
  });
};
