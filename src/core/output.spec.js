const clipboardy = require('clipboardy')
const generateOutputFromIssueBody = require('./output')

describe('generateOutputFromIssueBody', () => {
  it('should print a link to open the page that creates a new issue filled with error report', () => {
    jest.spyOn(global.console, 'log')
    const markdown = `## Report
    
Awesome report`

    generateOutputFromIssueBody('frinyvonnick', 'gitmoji-changelog', markdown)

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(
        `Error: Whoops, something went wrong, please click on the following link to create an issue`
      )
    )
  })

  it('should copy issue body to clipboard when hyperlinks are not supported by the terminal', () => {
    const markdown = `## Report
    
Awesome report`

    generateOutputFromIssueBody('frinyvonnick', 'gitmoji-changelog', markdown)

    const clipboardContent = clipboardy.readSync()

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(
        `Error: Whoops, something went wrong, please click on the following link to create an issue https://github.com/frinyvonnick/gitmoji-changelog/issues/new?body=An+error+report+is+in+your+clipboard.+Please+paste+it+here.. An error report has been copied to your clipboard.`
      )
    )
    expect(clipboardContent).toEqual(markdown)
  })

  it('should write issue body directly to stdout if the function is called in TTY', () => {
    const markdown = `## Report
    
Awesome report`

    process.env.CI = true

    generateOutputFromIssueBody('frinyvonnick', 'gitmoji-changelog', markdown)

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(
        `Error: Whoops, something went wrong, please click on the following link to create an issue https://github.com/frinyvonnick/gitmoji-changelog/issues/new?body=Please+paste+your+error+report+here..`
      )
    )
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(markdown))
  })
})
