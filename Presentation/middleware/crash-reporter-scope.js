import { createContainer, asValue } from "awilix";
import { CrashReporter } from "../../Common/crash-reporter.server";

// workaround for https://github.com/zeit/next.js/issues/1852

export function crashReporterScope(req, res, next) {
  req.scope = createContainer().createScope();
  req.scope.register({
    crashReporter: asValue(new CrashReporter()),
  });
  next();
}
