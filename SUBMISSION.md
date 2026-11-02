# Cómo enviar tu solución

La base del ejercicio es un repositorio público. Tu entrega se realiza en tu propio fork; el repositorio original se conserva como punto de partida para todos los candidatos.

## 1. Prepara tu copia

Haz un **fork** desde GitHub y clona tu fork. Sustituye `TU_USUARIO` y `NOMBRE_DEL_REPO` por los valores reales:

```sh
git clone https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
cd NOMBRE_DEL_REPO
git switch -c solucion
```

Sigue el arranque del [README](README.md) y lee el [enunciado](CHALLENGE.md). Conserva el historial de la base para que podamos comparar tus cambios.

## 2. Trabaja dentro de los 90 minutos

Incluye en ese tiempo la revisión, los cambios, las comprobaciones y la explicación de tus decisiones. No necesitas completar todas las ideas del enunciado. Indica lo que funciona, lo que no has podido comprobar y los riesgos pendientes.

Completa [TECHNICAL_DECISIONS.md](TECHNICAL_DECISIONS.md) y [AI_USAGE.md](AI_USAGE.md). Si cambias la configuración o el arranque, actualiza también el README y `.env.example` con valores de ejemplo.

## 3. Guarda y sube tu versión

Revisa los archivos antes de crear el commit. `.env` está ignorado; no incluyas claves, datos reales de clientes, grabaciones personales, exports de sesiones ni volcados de tu base de datos. Tu fork y su historial serán públicos.

```sh
git status
git diff
git add .
git diff --cached --stat
git commit -m "Mejoras de fiabilidad y decisiones técnicas"
git push -u origin solucion
git rev-parse HEAD
```

Puedes hacer varios commits durante el trabajo; no se valora su cantidad. No necesitas desplegar una demo pública, subir imágenes Docker ni publicar tu base de datos.

## 4. Envía los enlaces al equipo

Responde por el **mismo canal por el que recibiste la prueba** con este formato:

```text
Repositorio: https://github.com/TU_USUARIO/NOMBRE_DEL_REPO
Rama: solucion
Commit final: https://github.com/TU_USUARIO/NOMBRE_DEL_REPO/commit/SHA_COMPLETO
Tiempo invertido: … minutos
Mejoras principales: …
Pendientes o limitaciones para ejecutarlo: …
```

El commit final fija la versión que revisaremos. Si necesitas enviar una corrección después, comunícalo y facilita el nuevo enlace.

**No abras una pull request contra el repositorio original ni uses sus issues para entregar la solución.** Así mantenemos las entregas fuera del espacio común del ejercicio, aunque los forks sigan siendo públicos.

Si no puedes publicar tu solución, acuerda una alternativa privada con el equipo antes de entregarla. No necesitas incluir tu CV ni otros datos personales en el repositorio.
