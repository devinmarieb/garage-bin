exports.seed = function(knex, Promise) {
  return knex('junk').del()
  .then(() => {
    return Promise.all([
      knex('junk').insert({
        name: 'car',
        reason: 'i need it',
        cleanliness: 'dusty',
        created_at: new Date
      }),
      knex('junk').insert({
        name: 'guitar',
        reason: 'i might learn',
        cleanliness: 'sparkling',
        created_at: new Date
      })
    ])
  })
}
