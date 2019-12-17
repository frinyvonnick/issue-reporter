const envinfo = require("envinfo");

const makeReportFromError = require("./report");

describe("makeReportFromError", () => {
  it("should return a correctly formatted stacktrace section", async () => {
    const error = new Error("Some error");

    const result = await makeReportFromError(error);

    expect(result.error.title).toEqual("Stacktrace");
    expect(result.error.stack).toEqual(error.stack);
  });

  it("should return a correctly formatted env infos section", async () => {
    const error = new Error("Some error");
    const envInfosResult = await envinfo.run(
      {
        System: ["OS"],
        Binaries: ["Node", "Yarn", "npm"]
      },
      { markdown: true }
    );

    const result = await makeReportFromError(error);

    expect(result.environment.title).toEqual("Environment");
    expect(result.environment.markdown).toEqual(envInfosResult);
  });

  it("should return a correctly formatted env infos section with custom config for envInfos", async () => {
    const error = new Error("Some error");
    const envInfosParam = { Binaries: ["Yarn"] };
    const envInfosResult = await envinfo.run(envInfosParam, { markdown: true });

    const result = await makeReportFromError(error, envInfosParam);

    expect(result.environment.title).toEqual("Environment");
    expect(result.environment.markdown).toEqual(envInfosResult);
  });
});
