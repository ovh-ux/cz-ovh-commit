"use strict";

module.exports = {
    // These are the main types
    TYPES: [
        { value: "first", name: "first commit" },
        { value: "feat", name: "A new feature" },
        { value: "fix", name: "A bug fix" },
        { value: "chore", name: "Refactoring, Changing the build process or auxiliary tools and libraries etc" },
        { value: "docs", name: "Documentation" },
        { value: "style", name: "Cosmetics purpose" },
        { value: "test", name: "Adding missing or correcting tests" }
    ],

    // sub types, if you want to be more specific, the type value is replaced by this one
    SUB_TYPES: {
        chore: [{ value: "merge", name: "A merge chore" }, { value: "refactor", name: "A refactor of code" }, { value: "chore", name: "Other" }]
    },

    // emojis to add before a type, the type is the key
    EMOJIS: {
        feat: ":sparkles:",
        fix: ":ambulance:",
        docs: ":books:",
        merge: ":handshake:",
        refactor: ":tractor:",
        style: ":lipstick:"
    },

    // should prompt about the scope
    useScope: ["feat", "fix", "chore", "docs", "style", "refactor"],

    // should prompt about the header
    useHeader: ["feat", "chore", "style", "test", "docs", "refactor", "merge"],

    // should prompt about the body
    useBody: ["feat", "chore", "style", "test"],

    // should prompt about the footer which indicates bug fix
    useFooter: ["feat", "fix"],

    // first line max header lenght
    headerLength: 72,

    // parser for the commit msg, the only value guarented is type
    parseCommitMsg (type, rawScope = "", header = "", body = "", rawFooter = "") {
        const scope = rawScope ? `(${rawScope})` : "";
        const footer = rawFooter ? `closes : ${rawFooter}` : "";
        switch (type) {
        case "first":
            return ":tada: initial commit";
        case "fix":
            return `:ambulance: fix${scope}: fix ${rawFooter}`;
        case "docs":
        case "chore":
        case "merge":
        case "refactor":
            return `${this.EMOJIS[type] || ""} ${type}${scope}: ${header}`;
        case "feat":
        default:
            return `${this.EMOJIS[type] || ""} ${type}${scope}: ${header}\n\n${body}\n\n${footer}`;
        }
    }
};
