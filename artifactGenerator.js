var inquirer = require('inquirer');
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var path = require("path");
var uuidv4 = require("uuid/v4");

var templateList = {
	list: "templates/list-artifact",
	doclib: "templates/document-library-artifact",
	choice: "templates/choice-field",
	text: "templates/text-field",
    lookup: "templates/lookup-field",
    bool: "templates/boolean-field",
    num: "templates/number-field",
    multi: "templates/multiline-field",
    dLookup: "templates/dependant-lookup-field",
    date: "templates/date-time-field"
};

var typeSelection = [
    {
        type: "list",
        name: "type",
        message: "What type of template do you want to configure? (use arrow keys to select)",
        choices: [
            {
                name: "New artifact definition template",
                value: "a"
            },
            {
                name: "New Field definition template",
                value: "f"
            }
        ]
    }
];

var artifactQuestions = [
    {
        type: "list",
        name: "type",
        message: "What type of artifact definition template would you like to configure?",
        choices: [
            {
                name: "New list definition",
                value: "list"
            },
            {
                name: "New document library definition",
                value: "doclib"
            }
        ]
    },
    {
        type: "input",
        name: "name",
        message: "Enter the content type name\n:"
    },
    {
        type: "input",
        name: "groupName",
        message: "Enter the group name\n:"
    },
    {
        type: "input",
        name: "guid",
        message: "Enter the guid for the content type.\nIf this field is left blank a new, random guid will be generated\n:"
    }
];

var fieldLinkQuestions = [
    {
        type: "input",
        name: "links",
        message: "Enter the fields you would like added to this list/content type, separated by commas\n:"
    }
]

var fieldQuestions = [
    {
        type: "list",
        name: "type",
        message: "What type of field definition template would you like to configure?",
        choices: [
            {
                name: "New text field definition",
                value: "text"
            },
            {
                name: "New lookup field definition",
                value: "lookup"
            },
            {
                name: "New choice field definition",
                value: "choice"
            },
            {
                name: "New boolean field definition",
                value: "bool"
            },
            {
                name: "New number field definition",
                value: "num"
            },
            {
                name: "New multi-line text field definition",
                value: "multi"
            },
            {
                name: "New date-time field definition",
                value: "date"
            },
            {
                name: "New dependant lookup field definition",
                value: "dLookup"
            }
        ]
    },
    {
        type: "input",
        name: "name",
        message: "Enter the new field name below\n:"
    },
    {
        type: "input",
        name: "groupName",
        message: "Enter the group name\n:"
    },
    {
        type: "input",
        name: "guid",
        message: "Enter the guid for the content type.\nIf this field is left blank a new, random guid will be generated\n:"
    }
];

lookupQuestions = [
    {
        type: "input",
        name: "list",
        message: "Enter the lookup list\n:"
    }
];

choiceQuestions = [
    {
        type: "input",
        name: "choices",
        message: "Enter the choices you would like available, separated by commas\n:"
    },
    {
        type: "input",
        name: "default",
        message: "Enter the default choice\n:"
    }
];

numQuestions = [
    {
        type: "input",
        name: "min",
        message: "Enter the minimum value (if none, leave blank)\n:"
    },
    {
        type: "input",
        name: "max",
        message: "Enter the maximum value (if none, leave blank)\n:"
    }
];


var templateType;
var artifactType;
var fieldType;
var camelizedName;
var camelizedList;
var pluralizedName;
var groupName;
var CTName;
var fieldName;
var fileContents;
var fieldLinks;
var additionalFields;
var newGuid;
var lookupList;
var choiceValues;
var defaultChoice;
var minVal;
var maxVal;
var fieldLinksTemplate = ".AddContentTypeFieldLink(fl.Field())\n\t\t\t\t\t\t";
var additionalFieldsTemplate = "fl.Field().InternalName,\n\t\t\t\t\t";
var targetPath = "./output/";

var camelized = function(str) {
	var camelizedStr = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
		return letter.toUpperCase();
	}).replace(/\s+|-/g, "");
	return camelizedStr;
}

var generateFieldLinks = function(fieldLinks) {
    var formattedFieldLinks = [];
    var formattedAdditionalFields = [];
    fieldLinks.forEach(function(fieldLink) {
        formattedFieldLinks.push(fieldLinksTemplate.replace("fl", fieldLink));
        formattedAdditionalFields.push(additionalFieldsTemplate.replace("fl", fieldLink))
    });
    return [formattedFieldLinks.join(""), formattedAdditionalFields.join("")];
};

var generateChoices = function(choices) {
    var formattedChoices = [];
    choices.forEach(function(choice) {
        formattedChoices.push('"' + choice + '",\n\t\t\t\t\t')
    })
    return formattedChoices.join("");
}

var getFiles = function(directory) {
    return fs.readdirAsync(path.join(__dirname, directory));
};

var getContent = function(directory, filename) {
    return fs.readFileAsync(path.join(__dirname, directory + "/" + filename), "utf8");
};

var writeFile = function(targetFilename, content) {
    var targetFilepath = targetPath + "/" + targetFilename;

    return fs.writeFileAsync(targetFilepath, content);
};

var generateFiles = function() {
    var promises = fileContents.map(function (result) {
        var targetFilename = result[1].replace("sample", camelizedName);

        var content = result[0]
                        .replace(new RegExp("SampleList", "g"), camelizedList)
                        .replace(new RegExp("SampleCT", "g"), camelizedName)
                        .replace(new RegExp("SampleField", "g"), camelizedName)
                        .replace(new RegExp("fieldName", "g"), fieldName)
                        .replace(new RegExp("CTName", "g"), CTName)
                        .replace(new RegExp("listName", "g"), pluralizedName)
                        .replace(new RegExp("fieldLinks", "g"), fieldLinks)
                        .replace(new RegExp("additionalFields", "g"), additionalFields)
                        .replace(new RegExp("newGuid", "g"), newGuid)
                        .replace(new RegExp("listLookup", "g"), lookupList)
                        .replace(new RegExp("choiceList", "g"), choiceValues)
                        .replace(new RegExp("minVal", "g"), minVal)
                        .replace(new RegExp("maxVal", "g"), maxVal)
                        .replace(new RegExp("defaultChoice", "g"), defaultChoice)
						.replace(new RegExp("groupName", "g"), groupName);

        return writeFile(targetFilename, content);
    });
    return Promise.all(promises);
};

inquirer.prompt(typeSelection)
.then(function(answer) {
    templateType = answer.type;
    return templateType === "a" ?  inquirer.prompt(artifactQuestions) :  inquirer.prompt(fieldQuestions);
})
.then(function(answers){
    templateType === "a" ? CTName = answers.name : fieldName = answers.name;
    groupName = answers.groupName;
    camelizedName = camelized(answers.name);
    templateType === "a" ? artifactType = answers.type : fieldType = answers.type;
    camelizedList = camelizedName + "s";
    pluralizedName = answers.name + "s";
    newGuid = answers.guid || uuidv4().toString();
    if (fieldType === "lookup" || fieldType === "dLookup") {
        return inquirer.prompt(lookupQuestions)
            .then(function(lookup) {
                lookupList = lookup.list;
                return getFiles(templateList[artifactType || fieldType]).map(function(filename) {
                    return Promise.all([getContent(templateList[artifactType || fieldType], filename), filename]);
                });
            })
    }
    if (fieldType === "choice") {
        return inquirer.prompt(choiceQuestions)
            .then(function(response) {
                defaultChoice = response.default;
                return generateChoices(response.choices.split(", "));
            })
            .then(function(formattedChoices) {
                choiceValues = formattedChoices;
                return getFiles(templateList[artifactType || fieldType]).map(function(filename) {
                    return Promise.all([getContent(templateList[artifactType || fieldType], filename), filename]);
                });
            });
    }
    if (fieldType === "num") {
        return inquirer.prompt(numQuestions)
            .then(function(values) {
                minVal = values.min;
                maxVal = values.max;
                return getFiles(templateList[artifactType || fieldType]).map(function(filename) {
                    return Promise.all([getContent(templateList[artifactType || fieldType], filename), filename]);
                });
            })
    }
    return getFiles(templateList[artifactType || fieldType]).map(function(filename) {
		return Promise.all([getContent(templateList[artifactType || fieldType], filename), filename]);
	});
})
.then(function(file) {
    fileContents = file;
    if (artifactType) {
        return inquirer.prompt(fieldLinkQuestions)
            .then(function(fieldLinks) {
                return generateFieldLinks(fieldLinks.links.split(", "))
            })
            .then(function(formattedFieldLinks) {
                fieldLinks = formattedFieldLinks[0];
                additionalFields = formattedFieldLinks[1];
                return generateFiles();
            });
    }
    generateFiles();
})
.then(function() {
	console.log("Finished generating file");
})
.catch(function rejected(err) {
	console.log("Error:", err.stack);
	prompt.finish();
});