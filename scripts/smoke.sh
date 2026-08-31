#!/bin/bash

echo ""
echo "======================================="
echo "       ABASTIBLE API - SMOKE"
echo "======================================="
echo ""

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

mkdir -p reports

npx newman run \
collections/smoke/abastible-api-smoke.postman_collection.json \
-e environments/smoke/abastible-smoke-qa.local.postman_environment.json  \
-r cli,htmlextra \
--reporter-htmlextra-export reports/smoke_$TIMESTAMP.html

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