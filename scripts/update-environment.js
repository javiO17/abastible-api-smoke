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

const environment = JSON.parse(
    fs.readFileSync(templatePath, "utf8")
);

if (!Array.isArray(environment.values)) {
    throw new Error(
        "El environment template no contiene una propiedad 'values' válida"
    );
}

const replacements = {
    baseUrl: process.env.API_BASE_URL,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    deviceId: process.env.API_DEVICE_ID,
    appVersion: process.env.APP_VERSION
};

const missingVariables = Object.entries(replacements)
    .filter(([, value]) => value === undefined || value === "")
    .map(([key]) => key);

if (missingVariables.length > 0) {
    throw new Error(
        `Faltan variables de entorno obligatorias: ${missingVariables.join(", ")}`
    );
}

environment.values.forEach((variable) => {
    if (
        Object.prototype.hasOwnProperty.call(replacements, variable.key)
    ) {
        variable.value = replacements[variable.key];
    }
});

fs.writeFileSync(
    outputPath,
    JSON.stringify(environment, null, 2)
);

console.log("Environment generado correctamente:");
console.log(outputPath);