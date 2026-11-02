export async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    signal: options.signal
      ? AbortSignal.any([options.signal, AbortSignal.timeout(25000)])
      : AbortSignal.timeout(25000),
  });
  const data = await response.json().catch(() => ({ error: 'Respuesta inesperada del servidor.' }));
  if (!response.ok) throw new Error(data.error || `Error HTTP ${response.status}`);
  return data;
}
export const post = (path, body = {}) => request(path, { method: 'POST', body: JSON.stringify(body) });
