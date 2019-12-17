const issueTemplate = require('./issue-template')
const Handlebars = require('handlebars')

module.exports = function makeIssueBodyFromReport({ errorReport, sections, formatReport }) {
  if (formatReport) return formatReport(errorReport)

  const compiler = Handlebars.compile(issueTemplate)

  Handlebars.registerHelper('print_section', function () {
    let section = `\n## ${this.title}\n\n`

    section += Object.keys(this.content).reduce((acc, currentKey, currentIndex, keys) => {
      let row = `${acc}- **${currentKey}**: ${this.content[currentKey]}`
      
      if (currentIndex !== keys.length - 1) {
        row += '\n'
      }

      return row
    }, '')

    return section
  })

  return compiler({
    error: errorReport.error,
    environment: errorReport.environment,
    sections,
  })
}