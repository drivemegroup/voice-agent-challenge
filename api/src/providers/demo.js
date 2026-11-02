const questions = {
  firstName: 'Hola. Soy Vera, tu asistente. ¿Cuál es tu nombre?',
  lastName: 'Gracias. ¿Cuáles son tus apellidos?',
  email: '¿Cuál es tu correo electrónico?',
};
export const greeting = questions.firstName;
export function normalizeEmail(value) {
  return value.toLowerCase().replace(/^mi (correo|email) es\s+/i, '')
    .replace(/arroba/g, '@').replace(/punto/g, '.').replace(/\s+/g, '');
}
export async function demoTurn(session, text) {
  const draft = { ...session.draft };
  if (session.step === 'confirmation') {
    return { draft, step: 'confirmation', confirmed: /s[ií]|correcto|vale/i.test(text),
      reply: '¿Confirmas que estos datos son correctos?' };
  }
  if (session.step === 'firstName') draft.firstName = text.replace(/^(me llamo|mi nombre es|soy)\s+/i, '').trim().split(' ')[0];
  if (session.step === 'lastName') draft.lastName = text.replace(/^(mis apellidos son|mi apellido es)\s+/i, '').trim();
  if (session.step === 'email') draft.email = normalizeEmail(text);
  const step = !draft.firstName ? 'firstName' : !draft.lastName ? 'lastName' : !draft.email ? 'email' : 'confirmation';
  return { draft, step, confirmed: false,
    reply: questions[step] || `Tengo ${draft.firstName} ${draft.lastName}, correo ${draft.email}. ¿Son correctos?` };
}
