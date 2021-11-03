var fs = require("fs");

function readAndWriteFileSync(path, functionToDo, args) {
  var data = fs.readFileSync(path, "utf8");
  var parsedData = JSON.parse(data);

  var changedData = (function () {
    return functionToDo(parsedData, args);
  })();

  var stringifiedData = JSON.stringify(changedData);

  fs.writeFileSync(path, stringifiedData);
}

module.exports = readAndWriteFileSync;
