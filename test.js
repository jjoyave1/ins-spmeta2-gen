
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

var curFiles;
var fieldGroups = [];

function getFileNames() {
    return fs.readdirAsync("./output");
}

function grabGroups(files) {
    var promises = [];
    files.forEach(function(file) {
        promises.push(fs.readFileAsync("./output/" + file, "utf8").then(function(data) {
            var findGroup = new RegExp(/Group = "(.?[A-z\s]+)"/g)
            fieldGroups.push(findGroup.exec(data)[1])
        }));
    })

    return Promise.all(promises);
}

getFileNames().then(grabGroups)
.then(function(result) {
    fs.readFileAsync("./inquirer-prompts/testGroups.js", "utf8").then(function(fileContents) {
        console.log(fileContents)
    })
});
