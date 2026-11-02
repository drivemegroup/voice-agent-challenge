import { db, readSession } from '../db.js';
import { interpret, providerName } from '../providers/index.js';
import { saveCustomer } from './crm.js';
export async function advance(id, { text, source = 'text', confidence = null, fault = 'none' }) {
  const session = await readSession(id);
  if (!session) throw Object.assign(new Error('Conversación no encontrada.'), { status: 404 });
  if (session.status === 'completed') throw Object.assign(new Error('Inicia una nueva conversación.'), { status: 409 });
  const start = performance.now();
  let usage;
  try {
    await db.query('INSERT INTO messages(session_id,role,content,source,confidence) VALUES($1,$2,$3,$4,$5)',
      [id, 'user', text, source, confidence]);
    const result = await interpret(session, text, fault);
    usage = result.usage;
    let customerId = null;
    if (result.confirmed) {
      if (fault === 'crm-unavailable') throw Object.assign(new Error('El CRM no está disponible. Reintenta el turno.'), { status: 503 });
      const customer = await saveCustomer(result.draft);
      customerId = customer.id;
      result.reply = 'Listo. Tus datos se han guardado en el CRM. Gracias por tu tiempo.';
    }
    await db.query(`UPDATE sessions SET draft=$2, step=$3, status=$4, customer_id=$5,
      updated_at=now() WHERE id=$1`, [id, result.draft, result.step,
      result.confirmed ? 'completed' : 'collecting', customerId]);
    await db.query('INSERT INTO messages(session_id,role,content) VALUES($1,$2,$3)', [id, 'assistant', result.reply]);
    await recordMetric(id, start, usage, 'ok');
    return readSession(id);
  } catch (error) {
    await recordMetric(id, start, usage, 'error');
    throw error;
  }
}
async function recordMetric(id, start, usage, outcome) {
  await db.query(`INSERT INTO turn_metrics(session_id,provider,latency_ms,input_tokens,output_tokens,outcome)
    VALUES($1,$2,$3,$4,$5,$6)`, [id, providerName, Math.round(performance.now() - start),
    usage?.input_tokens || 0, usage?.output_tokens || 0, outcome]);
}
