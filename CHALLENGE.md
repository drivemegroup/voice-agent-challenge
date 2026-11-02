# De prototipo a producto fiable

Te incorporas a un equipo que está probando **Vera**, una asistente para recoger datos de clientes en un call center. El recorrido sencillo funciona, pero aún no tenemos confianza suficiente para usarlo con clientes reales.

## Objetivo

Mejora el sistema para recoger **nombre, apellidos y correo electrónico** con fiabilidad y poca fricción. Revisa lo que recibes, decide dónde invertir tu tiempo y deja una solución que puedas explicar.

La conversación debe conservar la información que aporta la persona, admitir aclaraciones y correcciones, pedir confirmación antes del registro y contrastar la identidad con el CRM sin modificar contactos ajenos por error. Cuando una dependencia falle, la persona debe entender qué ha ocurrido y cómo continuar. No asumas que transcribir una frase equivale a disponer de un dato validado.

Tienes el frontend, voz por turnos, alternativa por texto, API, base de datos, CRM simulado y controles de fallo. Puedes usar el intérprete demo como punto de partida, sustituirlo o conectar un proveedor de IA. Si no dispones de claves, documenta esa limitación y cómo evaluarías la integración real. La infraestructura del proveedor no debe bloquear tu trabajo.

## Tiempo y priorización

- Dedica **1,5 horas (90 minutos)**, incluyendo revisión, implementación y documentación. No esperamos que termines todas las mejoras ni que prolongues la prueba para completarlas.
- Empieza identificando los riesgos y elige dónde invertir el tiempo según impacto en el cliente, gravedad y esfuerzo. Puedes concentrarte en una o dos mejoras si son las más relevantes.
- Deja por escrito qué has priorizado, qué has descartado y qué queda pendiente. Explica también si cambiaste de prioridad al descubrir algo durante el trabajo.
- Puedes utilizar asistentes de programación, documentación y las herramientas habituales.
- Prioriza fiabilidad y claridad. No se valora rediseñar la interfaz ni añadir tecnologías sin una necesidad concreta.
- Puedes modificar la arquitectura y los contratos si explicas el motivo y actualizas las instrucciones.
- Trabaja únicamente con datos ficticios y no incluyas claves en tu entrega.

## Qué debe garantizar el producto

Estos son los requisitos que consideramos imprescindibles para poder confiar en el sistema. Úsalos como referencia para detectar carencias y priorizar; **no se exige que los resuelvas todos en 90 minutos**. Identifica cuáles quedan cubiertos por tu entrega y cuáles siguen pendientes.

- **Datos fiables:** conservar nombres y apellidos, validar el formato del correo y permitir corregir información sin perder los demás datos.
- **Confirmación antes de guardar:** un borrador o una transcripción no equivalen a datos confirmados. No registrar información que la persona haya rechazado o que siga siendo ambigua.
- **CRM consistente:** no crear contactos duplicados al repetir una petición o reintentar una operación. Si ya existe un correo, distinguir una coincidencia de un conflicto de identidad y evitar sobrescribir datos de otra persona.
- **Errores recuperables:** gestionar fallos de IA, transcripción y CRM con un mensaje útil y una forma de continuar. No mostrar un éxito si el guardado ha fallado ni perder los datos ya recogidos.
- **Un recorrido utilizable:** mantener el flujo de recogida y la alternativa por texto. Las claves deben permanecer fuera del frontend y del repositorio.

## Ideas de mejora

Este es un menú de posibilidades, **no una lista de tareas obligatorias ni un orden de prioridad**. Puedes elegir otras si justificas que aportan más valor.

| Área | Posibles intervenciones |
| --- | --- |
| CRM y duplicados | Contrastar contactos existentes, gestionar conflictos de identidad, hacer seguros los reintentos y evitar escrituras duplicadas o parciales. |
| Manejo de errores | Tratar timeouts, límites de peticiones, respuestas inválidas y caídas del CRM; conservar el progreso y ofrecer recuperación. |
| Proveedores de IA | Añadir o preparar adaptadores para OpenAI, Gemini u OpenRouter además de Anthropic; justificar cómo elegirías proveedor y modelo. |
| Transcripción | Integrar Whisper u otro servicio de transcripción, o preparar una interfaz sustituible; considerar nombres propios, ruido, idioma, latencia y privacidad. |
| Conversación y validación | Recoger varios datos en un turno, resolver correcciones, conservar acentos, interpretar emails hablados y pedir aclaraciones cuando sea necesario. |
| Evaluación y observabilidad | Elegir casos que detecten regresiones, distinguir transcripción de extracción y medir calidad, errores, latencia o consumo con datos reales. |

Por ejemplo, puedes decidir que evitar un registro incorrecto aporta más valor que añadir un segundo proveedor, o que la transcripción es el principal obstáculo para el producto. Queremos entender tu diagnóstico y la evidencia que lo sostiene. **Añadir más integraciones no da más puntos por sí mismo.**

No necesitas contratar servicios ni disponer de claves de todos los proveedores. Si una integración requiere acceso que no tienes, indica qué has implementado y qué no has podido verificar; no presentes un mock como una integración real comprobada.

## Entrega

1. Código e instrucciones suficientes para ejecutar tu versión con Docker.
2. Una lista breve de problemas priorizados, indicando impacto, qué has corregido y qué has decidido dejar fuera de los 90 minutos.
3. Algunas comprobaciones automatizadas útiles o una explicación concreta de qué falta verificar y por qué. Elige los casos; no hace falta una gran suite.
4. [TECHNICAL_DECISIONS.md](TECHNICAL_DECISIONS.md) y [AI_USAGE.md](AI_USAGE.md), breves y basados en lo que realmente has hecho.

Entrega mediante un fork y un enlace al commit final siguiendo [SUBMISSION.md](SUBMISSION.md). Envía los enlaces por el canal del proceso de selección; no abras una pull request contra este repositorio ni publiques tu entrega en sus issues.

Propón brevemente cómo compararías la calidad de extracción y conversación entre versiones: qué entradas usarías, qué resultados esperarías y qué métricas observarías. Implementa solo las comprobaciones que consideres más útiles dentro del tiempo disponible. No necesitamos un benchmark grande ni una puntuación inventada.

## Cómo se revisará

| Dimensión | Peso |
| --- | ---: |
| Extracción y validación | 20 |
| Experiencia de conversación | 15 |
| Arquitectura y separación de responsabilidades | 15 |
| Manejo de errores y recuperación | 15 |
| Calidad del código | 10 |
| Comprobaciones y evaluación de calidad | 10 |
| Decisiones sobre IA, coste y latencia | 10 |
| Uso crítico de herramientas de programación con IA | 5 |

La **capacidad de priorizar se valora en todas las dimensiones**: relación entre impacto y esfuerzo, riesgos que has abordado y motivos para posponer otros cambios. No hay una puntuación por completar el menú de ideas. Una mejora acotada y comprobada puede aportar más evidencia que varias integraciones incompletas.

La revisión incluye una conversación técnica de 20–30 minutos sobre tu propia solución. No valoramos el número de commits, de tests o de líneas escritas ni la cantidad de IA utilizada. Sí valoramos que puedas explicar los cambios, sus límites y cómo has comprobado su comportamiento.
