# Project Pulse final handoff

## Equipo

- **Orchestrator:** coordinó las fases, los alcances de archivo y la integración final.
- **Planner:** definió el contrato de datos, los criterios de aceptación y la secuencia de trabajo.
- **Designer:** estableció los hooks visuales, los estados de prioridad, el diseño responsivo y los estados vacíos/error.
- **Coder:** implementó la interfaz, la carga de datos, los filtros, la ordenación y la configuración de ejecución.

## Entrega

El dashboard está compuesto por:

- [app/index.html](../app/index.html): estructura HTML accesible, filtros y plantilla de tarjetas.
- [app/styles.css](../app/styles.css): tokens visuales, tarjetas, badges, estados y layout responsivo.
- [app/project-data.json](../app/project-data.json): siete proyectos de muestra con estados, prioridades, propietarios, actividad, fechas y progreso.
- [app/main.js](../app/main.js): carga, normalización, renderizado, filtrado, búsqueda, ordenación y manejo de errores.

La configuración de ejecución está en [.vscode/launch.json](../.vscode/launch.json), con el nombre exacto **Run Project Pulse Dashboard**. Usa `python3 -m http.server 5500` desde `app/` y abre `index.html` en el navegador.

## validation

- `python3 -m json.tool app/project-data.json`: aprobado.
- `python3 -m json.tool .vscode/launch.json`: aprobado.
- Smoke test HTTP local: aprobado; `index.html` y `project-data.json` se sirven correctamente y se detectan 7 proyectos.
- La estructura contiene `Project Pulse`, `.dashboard`, `.project-card` y campos visibles para estado, actividad reciente y prioridad.
- La interfaz incluye filtros por estado y prioridad, búsqueda, ordenación, botón para limpiar filtros y estados de carga, vacío y error.
- El CSS incluye reflujo a una columna en móvil y varias columnas en pantallas mayores, además de foco visible y soporte para texto largo.
- `./scripts/validate-exercise.sh`: no queda completamente verde por dos comprobaciones del repositorio ajenas a la implementación del dashboard: seguimiento de archivos de respuesta del template y contenido narrativo de `README.md`.

## handoff

La entrega está lista para revisión manual. Para ejecutarla, selecciona **Run Project Pulse Dashboard** en la configuración de lanzamiento de [.vscode/launch.json](../.vscode/launch.json). Como siguientes mejoras opcionales quedan la persistencia de filtros, paginación para volúmenes grandes y validación automatizada de interacciones en navegador.
