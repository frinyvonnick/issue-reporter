const envCi = require('env-ci')
const clipboardy = require('clipboardy')
const terminalLink = require('terminal-link')
const newGithubIssueUrl = require('new-github-issue-url')

module.exports = function generateOutputFromIssueBody(user, repo, markdown) {
  let errorMsg = `Error: Whoops, something went wrong, please click on the following link to `
  const repoInfos = { user, repo }
  const { isCi } = envCi()

  if (isCi) {
    const link = newGithubIssueUrl({
      ...repoInfos,
      body: 'Please paste your error report here.'
    })
    errorMsg += `create an issue ${link}.\n\n${markdown}`
  } else if (terminalLink.isSupported) {
    const url = newGithubIssueUrl({
      ...repoInfos,
      body: markdown
    })
    const link = terminalLink('create an issue', url)
    errorMsg += `${link}.`
  } else {
    const link = newGithubIssueUrl({
      ...repoInfos,
      body: 'An error report is in your clipboard. Please paste it here.'
    })
    clipboardy.writeSync(markdown)
    errorMsg += `create an issue ${link}. An error report has been copied to your clipboard.`
  }

  console.log(errorMsg)
}
