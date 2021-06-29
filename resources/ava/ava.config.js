export default {
  "verbose": true,
  "require": [
    "esm"
  ],
  "files": [
    "tests/*.js",
    "tests/**/*.js",
    "client/tests/*.js",
    "client/tests/**/*.js",
    "service/tests/*.js",
    "service/tests/**/*.js"
  ],
  "nodeArguments": [
    "--trace-deprecation",
    "--napi-modules",
    "--enable-source-maps"
  ]
}