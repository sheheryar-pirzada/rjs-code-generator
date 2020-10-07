let reducer = [];
let reducerName = '';

function generateReducer(actions, actionsPath) {
  reducer = [];
  reducerName = '';

  reducerName = actionsPath.split("/");
  reducerName = reducerName[reducerName.length - 1].split(".")[0];

  importsAndInitialState(actions, actionsPath);
  reducerAndSwitchBlock(actions);
  reducer.push(`export default ${reducerName};`);
  return reducer;
};

function importsAndInitialState(actions, actionsPath) {
  reducer.push("import produce from 'immer'");
  reducer.push("import {");
  actions.forEach(function (action) {
    reducer.push(`${action},`);
  });
  reducer.push(`} from ${relativeActionsPath(actionsPath)};`);
  reducer.push('const initialState = {};');
};

function reducerAndSwitchBlock(actions) {
  reducer.push(`const ${reducerName} = (state = initialState, action) =>`);
  reducer.push(`\tproduce(state, draftState => {`);
  // generate switch block 
  generateSwitchBlock(actions);
  reducer.push(`\t});`);
}

function generateSwitchBlock(actions) {
  reducer.push(`\t\tswitch (action.type) {`);
  actions.forEach(function (action) {
    reducer.push(`\t\t\tcase ${action}:`);
    reducer.push(`\t\t\t\tbreak;`);
  });
  reducer.push(`\t\t\tdefault:`);
  reducer.push(`\t\t\t\treturn state`);
  reducer.push(`\t\t}`);
}

function relativeActionsPath(path) {
  // path -> user/sherry/desktop/myActions.actions.js
  // we need to convert to -> ./myActions.actions.js
  const arr = path.split("/");
  return `./${arr[arr.length - 1]}`;
};

module.exports = { generateReducer };
