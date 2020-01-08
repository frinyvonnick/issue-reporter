const makeReportFromError = require('./core/report')
const makeIssueBodyFromReport = require('./core/issue-body')
const generateOutputFromIssueBody = require('./core/output')

module.exports = async function issueReporter({
  error,
  envinfo,
  sections,
  user,
  repo
}) {
  const errorReport = await makeReportFromError(error, envinfo)
  const issueBody = makeIssueBodyFromReport({
    errorReport,
    sections
  })
  generateOutputFromIssueBody(user, repo, issueBody)
}
