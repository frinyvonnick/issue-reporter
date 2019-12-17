module.exports = `## {{error.title}}

\`\`\`
{{error.stack}}
\`\`\`

## {{environment.title}}

{{environment.markdown}}
{{#each sections}}
{{print_section}}
{{/each}}
`