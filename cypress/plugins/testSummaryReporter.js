const fs = require("fs");
const path = require("path");

function registerSummaryReporter(on, config) {
  const reportDir = path.join(config.projectRoot, "cypress", "reports");

  on("after:run", (results) => {
    if (!results || !results.runs) return;

    const tests = results.runs.flatMap((run) =>
      run.tests.map((test) => {
        const attempts = test.attempts || [];
        const lastAttempt = attempts[attempts.length - 1] || {};
        return {
          spec: run.spec.relative,
          title: test.title.join(" > "),
          state: test.state,
          retried: attempts.length > 1,
          error: test.state === "failed" ? (lastAttempt.error && lastAttempt.error.message) || test.displayError : null,
        };
      })
    );

    const passed = tests.filter((t) => t.state === "passed");
    const failed = tests.filter((t) => t.state === "failed");
    const others = tests.filter((t) => !["passed", "failed"].includes(t.state));

    const lines = [
      "# Resumo da execução",
      "",
      `Total: ${tests.length} | ✅ ${passed.length} passaram | ❌ ${failed.length} falharam | ⏭️ ${others.length} ignorados`,
      "",
      "## ✅ Passaram",
      ...(passed.length ? passed.map((t) => `- ${t.title}${t.retried ? " (passou apenas após retry)" : ""}`) : ["- nenhum"]),
      "",
      "## ❌ Falharam",
      ...(failed.length ? failed.map((t) => `- ${t.title}\n    ${String(t.error).split("\n")[0]}`) : ["- nenhum"]),
    ];

    if (others.length) {
      lines.push("", "## ⏭️ Ignorados", ...others.map((t) => `- ${t.title} (${t.state})`));
    }

    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(path.join(reportDir, "summary.json"), JSON.stringify(tests, null, 2));
    fs.writeFileSync(path.join(reportDir, "summary.md"), lines.join("\n"));

    console.log(`\n${lines.join("\n")}\n\nRelatório salvo em cypress/reports/summary.(json|md)\n`);
  });
}

module.exports = { registerSummaryReporter };
