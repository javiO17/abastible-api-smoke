#!/bin/bash

echo ""
echo "======================================="
echo "       ABASTIBLE API - SMOKE"
echo "======================================="
echo ""

ENV_FILE="environments/smoke/abastible-smoke-qa.local.postman_environment.json"

if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: No existe el archivo de environment local:"
    echo "$ENV_FILE"
    echo ""
    echo "Crea una copia desde:"
    echo "environments/smoke/abastible-smoke-qa.example.postman_environment.json"
    echo ""
    echo "y configura tus credenciales/variables locales."
    exit 1
fi

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

mkdir -p reports

npx newman run \
collections/smoke/abastible-api-smoke.postman_collection.json \
-e "$ENV_FILE" \
-r cli,htmlextra \
--reporter-htmlextra-export "reports/smoke_$TIMESTAMP.html"

EXIT_CODE=$?

echo ""

if [ $EXIT_CODE -eq 0 ]; then
    echo "Smoke finalizado correctamente"
    echo "Reporte generado:"
    echo "reports/smoke_$TIMESTAMP.html"
else
    echo "Smoke finalizó con errores"
fi

exit $EXIT_CODE