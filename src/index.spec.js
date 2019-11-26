const envinfo = require('envinfo')
const { errorReporter, transformToMarkdown, outputGenerator } = require('./index')

describe('Error reporter', () => {
  describe('Core infos', () => {
    it('should return a correctly formatted stacktrace section', async () => {
      const error = new Error('Some error')
      
      const result = await errorReporter(error)
  
      expect(result.sections[0].title).toEqual('Stacktrace')
      expect(result.sections[0].stack).toEqual(error.stack)
    })
  
    it('should return a correctly formatted env infos section', async () => {
      const error = new Error('Some error')
      const envInfosResult = await envinfo.run({
        System: ['OS'],
      }, { markdown: true })
      
      const result = await errorReporter(error)
  
      expect(result.sections[1].title).toEqual('Environment')
      expect(result.sections[1].markdown).toEqual(envInfosResult)
    })
  })
  
  describe('Markdown formatter', () => {
    it('should format a json error as markdown', () => {
      const errorReport = {
        sections: [
          {
            title: 'Stacktrace',
            stack: 'Stack'
          },
          {
            title: 'Environment',
            markdown: 'Environment markdown'
          }
        ]
      }

      const result = transformToMarkdown(errorReport)

      expect(result).toMatchSnapshot()
    })
  })

  describe('Output generator', () => {
    it('should print a link to open the page that creates a new issue filled with error report', () => {
      jest.spyOn(global.console, 'log')
      const markdown = `## Report
      
Awesome report`

      outputGenerator('frinyvonnick', 'gitmoji-changelog', markdown)

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Error: Whoops, something went wrong, please click on the following link to create an issue`))
    })
  })
})