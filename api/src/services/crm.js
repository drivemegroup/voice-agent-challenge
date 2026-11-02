import { randomUUID } from 'node:crypto';
import { db, customerJson } from '../db.js';
export async function searchCustomers(query = '') {
  const { rows } = await db.query(`SELECT * FROM customers WHERE
    first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1 ORDER BY created_at DESC LIMIT 50`, [`%${query}%`]);
  return rows.map(customerJson);
}
export async function saveCustomer(data) {
  const { rows: [customer] } = await db.query(`INSERT INTO customers(id, first_name, last_name, email)
    VALUES($1,$2,$3,$4) ON CONFLICT(email) DO UPDATE SET first_name=EXCLUDED.first_name,
    last_name=EXCLUDED.last_name, updated_at=now() RETURNING *`,
    [randomUUID(), data.firstName, data.lastName, data.email]);
  return customerJson(customer);
}
