<h1 align="center">Welcome to issue-reporter 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D10.0.0-blue.svg" />
  <a href="https://github.com/frinyvonnick/markdown-error-reporter#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/frinyvonnick/markdown-error-reporter/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/frinyvonnick/markdown-error-reporter/blob/master/LICENSE" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/github/license/frinyvonnick/issue-reporter" />
  </a>
  <a href="https://twitter.com/yvonnickfrin" target="_blank">
    <img alt="Twitter: yvonnickfrin" src="https://img.shields.io/twitter/follow/yvonnickfrin.svg?style=social" />
  </a>
</p>

> A lib that generates issue reports for unexcepted errors.

### 🏠 [Homepage](https://github.com/frinyvonnick/markdown-error-reporter#readme)

## Prerequisites

- npm >=5.5.0
- node >=10.0.0

## Install

```sh
yarn add issue-reporter
```

## Usage

```sh
const issueReporter = require('issue-reporter')

async function main() {
  try {
    throw new Error('Some unexcepted error')
  } catch (e) {
    await issueReporter({
      error: e,
      user: 'frinyvonnick',
      repo: 'issue-reporter',
    })
  }
}
```

### Output

`issue-reporter`'s output depends on your environment:

If you terminal supports [Hyperlinks](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda) it will print a friendly error message with a clickable link that opens a form to create a new issue with a prefilled error report on your project.

If your terminal doesn't support [Hyperlinks](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda), `issue-reporter` will copy the error report in your clipboard and print an url that opens a new issue on your project so you can directly paste the report on the issue template.

In case of a CI it will print an url that opens a new issue on your project followed by a full report error in markdown you can copy paste in the issue body.


### Options

| option                  | description                                                                                     | type                       | required    |
|-------------------------|-------------------------------------------------------------------------------------------------|----------------------------|-------------|
| error                   | An Error instance                                                                               | Error                      | required    |
| user                    | You GitHub handle                                                                               | string                     | required    |
| repo                    | The repository name of your project                                                             | string                     | required    |
| sections                | Custom sections to add in the error report                                                      | Array<Object>              | optional    |
| formatReport            | A function that allows to write your own error report template                                  | function                   | optional    |

### Advanced examples

#### With sections

`issue-reporter` takes an extra option called `sections` that let you add information specific to your project. You can add as many sections as you want.

```sh
const issueReporter = require('issue-reporter')

async function main() {
  try {
    throw new Error('Some unexcepted error')
  } catch (e) {
    await issueReporter({
      error: e,
      user: 'frinyvonnick',
      repo: 'issue-reporter',
      sections: [
        {
          title: "My project specific information",
          content: {
            version: "1.0.1",
            release: "2.0.0",
            commit: "qwej79qwjeqw8euqo8wj8eq8"
          }
        }
      ]
    })
  }
}
```

#### With custom formatter

`issue-reporter` has a default markdown formatter. If you want a more flexible way to format your error reporter you can provide your own formatting function.

```sh
const issueReporter = require('issue-reporter')

async function main() {
  try {
    throw new Error('Some unexcepted error')
  } catch (e) {
    await issueReporter({
      error: e,
      user: 'frinyvonnick',
      repo: 'issue-reporter',
      formatReport: (errorReport) => {
        return `## ${errorReport.error.title}
        
        ${errorReport.error.stack}
        
        ## ${errorReport.environment.title}
        
        ${errorReport.environment.markdown}
        `
      },
    })
  }
}
```

## Run tests

```sh
yarn run test
```

## Author

👤 **Yvonnick FRIN**

* Website: https://yvonnickfrin.dev
* Twitter: [@yvonnickfrin](https://twitter.com/yvonnickfrin)
* Github: [@frinyvonnick](https://github.com/frinyvonnick)


👤 **Franck ABGRALL**

* Website: https://www.franck-abgrall.me
* Twitter: [@FranckAbgrall](https://twitter.com/FranckAbgrall)
* Github: [@kefranabg](https://github.com/kefranabg)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/frinyvonnick/markdown-error-reporter/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Yvonnick FRIN](https://github.com/frinyvonnick).<br />
This project is [Apache--2.0](https://github.com/frinyvonnick/markdown-error-reporter/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
