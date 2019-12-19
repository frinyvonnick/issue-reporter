const makeReportFromError = require('./core/report')
const makeIssueBodyFromReport = require('./core/issue-body')
const generateOutputFromIssueBody = require('./core/output')

module.exports = async function issueReporter(options) {
  const errorReport = await makeReportFromError(options.error)
  const issueBody = makeIssueBodyFromReport({
    errorReport,
    sections: options.sections
  })
  generateOutputFromIssueBody(options.user, options.repo, issueBody)
}
