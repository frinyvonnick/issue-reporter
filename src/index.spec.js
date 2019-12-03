const envinfo = require('envinfo')
const clipboardy = require('clipboardy')
const { makeReportFromError, makeIssueBodyFromReport, generateOutputFromIssueBody } = require('./index')

describe('Error reporter', () => {
  describe('makeReportFromError', () => {
    it('should return a correctly formatted stacktrace section', async () => {
      const error = new Error('Some error')
      
      const result = await makeReportFromError(error)
  
      expect(result.error.title).toEqual('Stacktrace')
      expect(result.error.stack).toEqual(error.stack)
    })
  
    it('should return a correctly formatted env infos section', async () => {
      const error = new Error('Some error')
      const envInfosResult = await envinfo.run({
        System: ['OS'],
        Binaries: ['Node', 'Yarn', 'npm'],
      }, { markdown: true })
      
      const result = await makeReportFromError(error)
  
      expect(result.environment.title).toEqual('Environment')
      expect(result.environment.markdown).toEqual(envInfosResult)
    })

    it('should return a correctly formatted env infos section with custom config for envInfos', async () => {
      const error = new Error('Some error')
      const envInfosParam = { Binaries: ['Yarn'] }
      const envInfosResult = await envinfo.run(envInfosParam, { markdown: true })
      
      const result = await makeReportFromError(error, envInfosParam)
  
      expect(result.environment.title).toEqual('Environment')
      expect(result.environment.markdown).toEqual(envInfosResult)
    })
  })

  describe('makeIssueBodyFromReport', () => {
    it('should format a json error as markdown', () => {
      const errorReport = {
        error: {
          title: 'Stacktrace',
          stack: 'Stack'
        },
        environment: {
          title: 'Environment',
           markdown: 'Environment markdown'
        }
      }

      const result = makeIssueBodyFromReport(errorReport)

      expect(result).toMatchSnapshot()
    })
  })

  describe('generateOutputFromIssueBody', () => {
    it('should print a link to open the page that creates a new issue filled with error report', () => {
      jest.spyOn(global.console, 'log')
      const markdown = `## Report
      
Awesome report`

      generateOutputFromIssueBody('frinyvonnick', 'gitmoji-changelog', markdown)

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Error: Whoops, something went wrong, please click on the following link to create an issue`))
    })

    it('should copy issue body to clipboard when hyperlinks are not supported by the terminal', () => {
      const markdown = `## Report
      
Awesome report`

      generateOutputFromIssueBody('frinyvonnick', 'gitmoji-changelog', markdown)

      const clipboardContent = clipboardy.readSync()

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Error: Whoops, something went wrong, please click on the following link to create an issue https://github.com/frinyvonnick/gitmoji-changelog/issues/new?body=An+error+report+is+in+your+clipboard.+Please+paste+it+here.. An error report has been copied to your clipboard.`))
      expect(clipboardContent).toEqual(markdown)
    })

    it('should write issue body directly to stdout if the function is called in TTY', () => {
      const markdown = `## Report
      
Awesome report`

      process.env.CI = true

      generateOutputFromIssueBody('frinyvonnick', 'gitmoji-changelog', markdown)

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Error: Whoops, something went wrong, please click on the following link to create an issue https://github.com/frinyvonnick/gitmoji-changelog/issues/new?body=Please+paste+your+error+report+here..`))
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining(markdown))
    })
  })
})