const envinfo = require('envinfo')
const Handlebars = require('handlebars')
const issueTemplate = require('./issue-template')
const newGithubIssueUrl = require('new-github-issue-url')
const terminalLink = require('terminal-link')

async function errorReporter (e) {
  const envInfosResult = await envinfo.run({
    System: ['OS'],
  }, { markdown: true })

  return {
    sections: [
      {
        title: 'Stacktrace',
        stack: e.stack,
      },
      {
        title: 'Environment',
        markdown: envInfosResult
      }
    ]
  }
}

function transformToMarkdown(errorReport) {
  const compiler = Handlebars.compile(issueTemplate)
  return compiler({
    error: errorReport.sections[0],
    environment: errorReport.sections[1],
  })
}

function outputGenerator(user, repo, markdown) {
  const url = newGithubIssueUrl({
    user,
    repo,
    body: markdown
  });

  const link = terminalLink('create an issue', url)

  const errorMsg = `Error: Whoops, something went wrong, please click on the following link to ${link}`

  console.log(errorMsg)
}

module.exports = {
  errorReporter,
  transformToMarkdown,
  outputGenerator
}