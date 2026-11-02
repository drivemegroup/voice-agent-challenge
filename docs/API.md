# API local

Todas las rutas pasan por `/api`. JSON de entrada y salida. No hay autenticación: el entorno es local y compartido. Los errores usan `{ "error": "mensaje" }`.

| Método | Ruta | Resultado |
| --- | --- | --- |
| GET | `/health` | Estado de BD, proveedor y simulaciones activas |
| POST | `/sessions` | Crea una conversación y devuelve su estado (201) |
| GET | `/sessions/:id` | Estado, borrador, mensajes y métricas |
| POST | `/sessions/:id/turns` | Procesa un turno y devuelve el estado |
| GET | `/customers/search?q=texto` | `{ customers: [...] }`, máximo 50 |
| POST | `/customers` | Registra un contacto y devuelve el registro (201) |

## Crear sesión y procesar un turno

```sh
curl -X POST http://localhost:8080/api/sessions

# Sustituye SESSION_ID por el UUID recibido
curl -X POST http://localhost:8080/api/sessions/SESSION_ID/turns \
  -H 'Content-Type: application/json' \
  -d '{"text":"Me llamo Sergio","source":"text","confidence":null,"fault":"none"}'
```

`source`: `text` o `voice`. `confidence`: null o número de 0 a 1 procedente del reconocedor; no es una garantía de corrección. Texto: máximo 4000 caracteres. `fault`: `none`, `timeout`, `rate-limit`, `malformed` o `crm-unavailable`.

El estado devuelto tiene esta forma:

```json
{
  "id": "UUID",
  "status": "collecting",
  "step": "firstName",
  "draft": { "firstName": "", "lastName": "", "email": "" },
  "customerId": null,
  "messages": [{ "id": "1", "role": "assistant", "content": "…", "source": "text", "confidence": null, "createdAt": "ISO-8601" }],
  "metrics": { "turns": 0, "totalLatencyMs": 0, "inputTokens": 0, "outputTokens": 0, "errors": 0 }
}
```

`status`: `collecting` o `completed`. `step`: `firstName`, `lastName`, `email` o `confirmation`. El borrador no incluye un estado de validación por campo. El último paso se mantiene como `confirmation` tras completar; el estado terminal lo indica `status`.

## CRM

```sh
curl 'http://localhost:8080/api/customers/search?q=sergio'
curl -X POST http://localhost:8080/api/customers \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Ana","lastName":"Pérez","email":"ana@example.com"}'
```

Los contactos tienen `id`, `firstName`, `lastName`, `email`, `createdAt` y `updatedAt`. El contrato de registro actual reutiliza un contacto si el correo coincide. Revisa si ese comportamiento satisface las necesidades del producto.

## Adaptadores de extracción

`interpret(session, text, fault)` recibe la sesión del servidor, el texto y el escenario. Devuelve:

```json
{
  "draft": { "firstName": "Ana", "lastName": "Pérez", "email": "ana@example.com" },
  "step": "confirmation",
  "confirmed": false,
  "reply": "¿Son correctos estos datos?"
}
```

Puede incluir `usage.input_tokens` y `usage.output_tokens`. La orquestación decide cómo persistir el resultado. Para añadir un proveedor, implementa un adaptador y selecciónalo en `providers/index.js`; actualiza la configuración y la documentación.
