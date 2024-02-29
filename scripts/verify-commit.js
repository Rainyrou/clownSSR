/* eslint-disable max-len */
const chalk = require("chalk");
const msgPath = process.env.HUSKY_GIT_PARAMS;
const msg = require("fs").readFileSync(msgPath, "utf-8").trim();

const commitRE =
  /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,80}/;
if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `${chalk.bgRed.white(" ERROR ")} ${chalk.red(
      "Invalid commit message format."
    )}\n\n` +
      chalk.red("Please follow the commit message convention:\n\n") +
      `${chalk.green("feat(component): add 'comments' option")}\n` +
      `${chalk.green("fix(module): handle events on blur (#28)")}\n\n` +
      chalk.blue(
        "See the commit guidelines at https://example.com/commit-convention\n"
      )
  );
  process.exit(1);
}
