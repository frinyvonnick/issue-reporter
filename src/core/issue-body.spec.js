const makeIssueBodyFromReport = require('./issue-body')

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

    const result = makeIssueBodyFromReport({ errorReport })

    expect(result).toMatchSnapshot()
  })

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

    const result = makeIssueBodyFromReport({
      errorReport,
      sections: [
        {
          title: 'Custom section',
          content: {
            version: '1.0.1',
            release: '2.0.0',
            commit: 'qwej79qwjeqw8euqo8wj8eq8'
          }
        },
        {
          title: 'Second section',
          content: {
            'awesome info': 'it works'
          }
        }
      ]
    })

    expect(result).toMatchSnapshot()
  })

  it('should call user format function', () => {
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

    const customFormat = 'Custom format'
    const formatReport = jest.fn(() => customFormat)

    const result = makeIssueBodyFromReport({ errorReport, formatReport })

    expect(formatReport).toHaveBeenCalledWith(errorReport)
    expect(result).toBe(customFormat)
  })

  it('should handle empty sections', () => {
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

    const result = makeIssueBodyFromReport({
      errorReport,
      sections: [
        {
          title: 'Custom section',
          content: null
        },
        {
          title: 'Second section',
          content: {
            'awesome info': 'it works'
          }
        }
      ]
    })

    expect(result).toMatchSnapshot()
  })
})
