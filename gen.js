var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var path = require("path");
var mkdirp = require("mkdirp");
var prompt = require("prompt-promise");
var uuidv4 = require("uuid/v4");

var templatesPath = "templates/";
// var targetPath = "./m2-model/ey.xHub.core/SiteCollection/Webs/sell/Webs/models/Webs/divestiture/Artefacts/";
var targetPath = "./output/";

var templateList = {
	list: "templates/list-artifact",
	doclib: "templates/document-library-artifact",
	choice: "templates/choice-field",
	text: "templates/text-field",
	lookup: "templates/lookup-field"
};

var newGuid = 'new Guid("' + (uuidv4().toString()) + '")';
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
						.replace(new RegExp("newGuid", "g"), newGuid);

        return writeFile(targetPath, targetFilename, content, templateOption);
    });
    return Promise.all(promises);
};

var camelized = function(str) {
	var camelizedStr = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
		return letter.toUpperCase();
	}).replace(/\s+|-/g, "");
	console.log(camelizedStr);
	return camelizedStr;
}

prompt("Enter template type:\nlist for a new list artifact\ndoclib for a new document library artifact\nchoice for a new choice field\ntext for a new text field\nlookup for a new lookup field\n:")
.then(function(val) {
	prompt.done();
	templateOption = val;

	if (templateOption === "f") {
		return prompt("What type of field do you want to create?\n ").then(function(fieldType) {
			// Do stuff here.
		})
	}

	//get file content from the template
	return getFiles(templateList[templateOption]).map(function(filename) {
		return Promise.all([getContent(templateList[templateOption], filename), filename]);
	});
})
.then(function(results) {
	fileContents = results;
	return prompt("Enter non-plural name of file to be created  (e.g. my-artifact NOT my-artifacts): ");
})
.then(function(val) {
	nameInput = val;
	camelizedNameInput = camelized(nameInput);
	pathInput = templateOption === "a" ? targetPath + "Definitions" : targetPath + "Fields";
  	prompt.done();

	return generateFiles(fileContents, camelizedNameInput, pathInput, targetPath, templateOption);
})
.then(function() {
	console.log("Finished generating file(s)");
})
.catch(function rejected(err) {
	console.log("Error:", err.stack);
	prompt.finish();
});
