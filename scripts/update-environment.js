const fs = require("fs");
const path = require("path");

const templatePath = path.join(
  __dirname,
  "../environments/smoke/abastible-smoke-qa.example.postman_environment.json"
);

const outputPath = path.join(
  __dirname,
  "../environments/smoke/abastible-smoke-qa.local.postman_environment.json"
);

const environment = JSON.parse(fs.readFileSync(templatePath, "utf8"));

const replacements = {
  baseUrl: process.env.API_BASE_URL,
  username: process.env.API_USERNAME,
  password: process.env.API_PASSWORD,
  deviceId: process.env.API_DEVICE_ID,
  appVersion: process.env.APP_VERSION
};

environment.values.forEach(variable => {
  if (
    Object.prototype.hasOwnProperty.call(replacements, variable.key) &&
    replacements[variable.key] !== undefined
  ) {
    variable.value = replacements[variable.key];
  }
});

fs.writeFileSync(outputPath, JSON.stringify(environment, null, 2));

console.log("Environment generado:");
console.log(outputPath);