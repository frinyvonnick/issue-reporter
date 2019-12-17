const envinfo = require('envinfo')

module.exports = async function makeReportFromError (e, envInfosConfig = {
  System: ['OS'],
  Binaries: ['Node', 'Yarn', 'npm'],
}) {
  const envInfosResult = await envinfo.run(envInfosConfig, { markdown: true })

  return {
    error: {
      title: 'Stacktrace',
      stack: e.stack,
    },
    environment: {
      title: 'Environment',
      markdown: envInfosResult
    }
  }
}