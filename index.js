"use strict";

const inquirer = require("inquirer");
const _ = require("lodash");
const findConfig = require("find-config");

function getConfig () {
    let pkg = findConfig.require("package.json");
    let configFile = _.get(pkg, "config.cz-ovh-commit.config", "./ovh-config");
    console.log("Using config file: ", configFile);
    return Object.assign({}, require("./ovh-config"), require(configFile));
}

module.exports = {
    prompter (cz, commit) {
        const config = getConfig();

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "type",
                    message: "Please select the TYPE of your commit: ",
                    choices: config.TYPES,
                    when: true
                },
                {
                    type: "list",
                    name: "type",
                    message: (answers) => `Please select the kind of ${answers.type}: `,
                    choices: (answers) => config.SUB_TYPES[answers.type],
                    when: (answers) => config.SUB_TYPES[answers.type] != null && config.SUB_TYPES[answers.type].length > 0,
                    filter: (input) => _.trim(input)
                },
                {
                    type: "input",
                    name: "scope",
                    message: "Please denote the SCOPE of the commit: (optional)",
                    when: (answers) => _.includes(config.useScope, answers.type),
                    filter: (input) => _.trim(input)
                },
                {
                    type: "input",
                    name: "header",
                    message: "Please write a HEADER: (mandatory)",
                    when: (answers) => _.includes(config.useHeader, answers.type),
                    validate: (input) => input && _.trim(input).length < config.headerLength && _.trim(input).length !== 0 ? true : `Message should not be empty and should be shorter than ${config.headerLength} characters`,
                    filter: (input) => _.trim(input, [" ."])
                },
                {
                    type: "input",
                    name: "body",
                    message: "Please write a BODY: (optional)",
                    when: (answers) => _.includes(config.useBody, answers.type),
                    filter: (input) => _.trim(input)
                },
                {
                    type: "input",
                    name: "footer",
                    message: "Please list the bug that has been closed, eg: #13, #42 or eg: crash when user click: (mandatory)",
                    when: (answers) => answers.type === "fix",
                    validate: (input) => input && _.trim(input).length !== 0 ? true : "List is empty",
                    filter: (input) => _.trim(input)
                },
                {
                    type: "input",
                    name: "footer",
                    message: "Please list any bug that has been closed, eg: #13, #42 or eg: crash when user click: (optional)",
                    when: (answers) => _.includes(config.useFooter, answers.type) && answers.type !== "fix",
                    filter: (input) => _.trim(input)
                },
                {
                    type: "confirm",
                    name: "confirm",
                    message: (answers) => `your commit message:\n\n${config.parseCommitMsg(answers.type, answers.scope, answers.header, answers.body, answers.footer)}\n\nIs your commit message correct ?`
                }
            ])
            .then((answers) => {
                const commitMessage = config.parseCommitMsg(answers.type, answers.scope, answers.header, answers.body, answers.footer);
                if (answers.confirm) {
                    commit(commitMessage);
                } else {
                    console.warn("Commit canceled, run `git cz` to retry");
                }
            });
    }
};
