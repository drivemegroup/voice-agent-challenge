import { readFile } from 'node:fs/promises';
const system = await readFile(new URL('./extraction-prompt.txt', import.meta.url), 'utf8');
export async function anthropicTurn(session, text) {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('Falta ANTHROPIC_API_KEY en el backend.');
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
      max_tokens: 600, system,
      messages: [{ role: 'user', content: JSON.stringify({
        draft: session.draft, step: session.step, history: session.messages, transcript: text,
      }) }],
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    const error = new Error(`El proveedor de IA ha respondido HTTP ${response.status}.`);
    error.status = response.status === 429 ? 429 : 502;
    throw error;
  }
  const payload = await response.json();
  const result = JSON.parse(payload.content.filter(block => block.type === 'text').map(block => block.text).join(''));
  return { ...result, usage: payload.usage };
}
