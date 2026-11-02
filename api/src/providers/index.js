import { demoTurn } from './demo.js';
import { anthropicTurn } from './anthropic.js';
export const providerName = process.env.AI_PROVIDER || 'demo';
if (!['demo', 'anthropic'].includes(providerName)) throw new Error('AI_PROVIDER debe ser demo o anthropic.');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export async function interpret(session, text, fault) {
  if (fault === 'timeout') { await sleep(2000); throw Object.assign(new Error('Timeout simulado del proveedor.'), { status: 504 }); }
  if (fault === 'rate-limit') throw Object.assign(new Error('Límite de peticiones simulado. Reintenta más tarde.'), { status: 429 });
  if (fault === 'malformed') return JSON.parse('{invalid response');
  return providerName === 'anthropic' ? anthropicTurn(session, text) : demoTurn(session, text);
}
