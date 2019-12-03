const envinfo = require('envinfo')
const Handlebars = require('handlebars')
const issueTemplate = require('./issue-template')
const newGithubIssueUrl = require('new-github-issue-url')
const terminalLink = require('terminal-link')
const clipboardy = require('clipboardy')
const envCi = require('env-ci')

async function makeReportFromError (e, envInfosConfig = {
  System: ['OS'],
  Binaries: ['Node', 'Yarn', 'npm'],
}) {
  const envInfosResult = await envinfo.run(envInfosConfig, { markdown: true })

  return {
    error: {
      title: 'Stacktrace',
      stack: e.stack,
    },
    environment: {
      title: 'Environment',
      markdown: envInfosResult
    }
  }
}

function makeIssueBodyFromReport(errorReport) {
  const compiler = Handlebars.compile(issueTemplate)
  return compiler({
    error: errorReport.error,
    environment: errorReport.environment,
  })
}

function generateOutputFromIssueBody(user, repo, markdown) {
  let errorMsg = `Error: Whoops, something went wrong, please click on the following link to `
  const repoInfos = { user, repo }
  const { isCi } = envCi()

  if (isCi) {
    const link = newGithubIssueUrl({
      ...repoInfos,
      body: 'Please paste your error report here.',
    });
    errorMsg += `create an issue ${link}.\n\n${markdown}`
  } else if (terminalLink.isSupported) {
    const url = newGithubIssueUrl({
      ...repoInfos,
      body: markdown,
    });
    const link = terminalLink('create an issue', url)
    errorMsg += `${link}.`
  } else {
    const link = newGithubIssueUrl({
      ...repoInfos,
      body: 'An error report is in your clipboard. Please paste it here.',
    });
    clipboardy.writeSync(markdown)
    errorMsg += `create an issue ${link}. An error report has been copied to your clipboard.`
  }

  console.log(errorMsg)
}

async function issueReporter(options) {
  const report = await makeReportFromError(options.error)
  const issueBody = makeIssueBodyFromReport(report)
  generateOutputFromIssueBody(options.user, options.repo, issueBody)
}

module.exports = {
  issueReporter,
  makeReportFromError,
  makeIssueBodyFromReport,
  generateOutputFromIssueBody
}