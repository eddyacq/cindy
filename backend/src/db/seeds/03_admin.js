import bcrypt from 'bcryptjs'

export async function seed(knex) {
  const email = 'admin@example.com'
  const exists = await knex('users').where({ email }).first()
  if (exists) return

  await knex('users').insert({
    first_name: 'Admin',
    last_name: 'User',
    email,
    password_hash: await bcrypt.hash('change-me-immediately', 10),
    role: 'admin',
  })
}