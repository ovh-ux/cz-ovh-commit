
# cz-ovh-commit

![OVH component](https://user-images.githubusercontent.com/3379410/27423240-3f944bc4-5731-11e7-87bb-3ff603aff8a7.png)

[![Maintenance](https://img.shields.io/maintenance/yes/2017.svg)]() [![Chat on gitter](https://img.shields.io/gitter/room/ovh/ux.svg)](https://gitter.im/ovh/ux) [![Build Status](https://travis-ci.org/ovh-ux/cz-ovh-commit.svg)](https://travis-ci.org/ovh-ux/cz-ovh-commit) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![NPM](https://nodei.co/npm/cz-ovh-commit.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cz-ovh-commit/)

Tool for unifying commit style inside OVH

# Installation

in a terminal:
```bash
  npm i -g commitizen
```

in the repos:
```bash
  npm install --save-dev cz-ovh-commit
  commitizen init cz-ovh-commit --save-dev --save-exact
  git cz -a
```

### customization

You can specify a custom config in your `package.json`, simply add:
```json
"config": {
  ...
  "cz-ovh-commit": {
    "config": "./path/to/your/config/file"
  }
  ...
}
```

this file can be either `.json` or `.js`.
Example of a json file type:
```json
{
  "TYPES": [
      { "value": "feat", "name": "A new feature" },
      { "value": "fix", "name": "A bug fix" },
      { "value": "docs", "name": "Documentation" },
      { "value": "style", "name": "Cosmetics purpose" },
      { "value": "refactor", "name": "Refactor"},
      { "value": "test", "name": "Adding missing or correcting tests" },
      { "value": "chore", "name": "Maintenance" }
  ],
  "EMOJIS": {},
  "useScope": ["feat", "fix", "docs", "style", "refactor", "test", "chore"]
}
```
You can find more details about the config file in `ovh-config.js`

## Get the sources

```bash
    git clone https://github.com/ovh-ux/cz-ovh-commit.git
    cd cz-ovh-commit
```

You've developed a new cool feature? Fixed an annoying bug? We'd be happy
to hear from you!

see https://github.com/ovh-ux/cz-ovh-commit/blob/master/CONTRIBUTING.md

## Run the tests

no test for the moment

## Build the documentation

look in `ovh-config.js` for building your config file

# Related links

 * Contribute: https://github.com/ovh-ux/ovh-ux-guidelines/blob/master/.github/CONTRIBUTING.md
 * Report bugs: https://github.com/ovh-ux/cz-ovh-commit/issues
 * Get latest version: https://github.com/ovh-ux/cz-ovh-commit

# License

See https://github.com/ovh-ux/cz-ovh-commit/blob/master/LICENSE
