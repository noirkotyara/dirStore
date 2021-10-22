var fs = require("fs");

function readAndWriteFileSync(path, functionToDo) {
  var data = fs.readFileSync(path, "utf8");
  var parsedData = JSON.parse(data);
  
  var changedData = functionToDo.call(this, parsedData);

  var stringifiedData = JSON.stringify(changedData);

  fs.writeFileSync(path, stringifiedData);
}

module.exports = {
  readAndWriteFileSync: readAndWriteFileSync,
};
