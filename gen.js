var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var path = require("path");
var mkdirp = require("mkdirp");
var prompt = require("prompt-promise");

var templatesPath = "templates/";
var targetPath = "output/";

var templateList = {
    a: "templates/artefact"
};

var pathInput = "";
var nameInput = "";
var camelizedNameInput = "";

var getFiles = function(directory) {
    return fs.readdirAsync(path.join(__dirname, directory));
};

var getContent = function(directory, filename) {
    return fs.readFileAsync(path.join(__dirname, directory + "/" + filename), "utf8");
};

var writeFile = function(targetPath, targetFilename, content, templateOption) {
    var targetFilepath = targetPath + "/" + targetFilename;

    return fs.writeFileAsync(targetFilepath, content);
}

var generateFiles = function(fileContents, nameInput, pathInput, targetPath, templateOption) {
    var promises = fileContents.map(function (result) {
        var targetFilename = result[1].replace("sample", nameInput);
        var templatePath = templatesPath + pathInput + "/" + nameInput + "/" + nameInput;

        var moduleName = "app." + pathInput.split("/").join(".");

        var content = result[0]
                        .replace(new RegExp("sample", "g"), nameInput)
                        .replace(new RegExp("Sample", "g"), camelizedNameInput)
                        .replace(new RegExp("templatePath", "g"), templatePath)
                        .replace(new RegExp("moduleName", "g"), moduleName);

        return writeFile(targetPath, targetFilename, content, templateOption);
    });
    return Promise.all(promises);
};

var camelized = function(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
		return index === 0 ? letter : letter.toUpperCase();
	}).replace(/\s+|-/g, "");
}

prompt("Enter template type (a for artefact, f for field): ")
.then(function(val) {
	prompt.done();
	templateOption = val;

	//get file content from the template
	return getFiles(directoryDict[templateOption]).map(function(filename) {
		return Promise.all([getContent(directoryDict[templateOption], filename), filename]);
	});
})
.then(function(results) {
	fileContents = results;
	return prompt("Enter name of file to be created (e.g. my-artefact): ");
})
.then(function(val) {
	nameInput = val;
	camelizedNameInput = camelized(nameInput);

	if (!isShared(templateOption)) {

		return prompt("Enter relative path (default 'output/'): ").then(function(val) {
			pathInput = val || "output/";
			targetPath = path.join(__dirname, pathInput + "/" + nameInput);
			prompt.done();

			return generateFiles(fileContents, nameInput, pathInput, targetPath, templateOption);
		});
	}
	targetPath = path.join(__dirname, sharedDirectivesPath + nameInput);
  prompt.done();

  var sharedPathInput = sharedDirectivesPath.substring(0, sharedDirectivesPath.length - 1).replace("app/modules/", "");

	return generateFiles(fileContents, nameInput, sharedPathInput, targetPath, templateOption);
})
.then(function() {
	console.log("Finished generating file(s)");
})
.catch(function rejected(err) {
	console.log("Error:", err.stack);
	prompt.finish();
});
