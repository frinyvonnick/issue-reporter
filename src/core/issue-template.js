module.exports = `## {{error.title}}

\`\`\`
{{error.stack}}
\`\`\`

## {{environment.title}}

{{environment.markdown}}
{{#each sections}}
{{print_section}}
{{/each}}

---

*This error report was generated with ❤️ by [issue-reporter](https://github.com/frinyvonnick/issue-reporter)*
`
