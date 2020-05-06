
exports.up = function(knex) {
  return knex.schema.createTable('lookfull', table => {
      table.increments('id').primary()
      table.integer('id_external').notNull()
      table.string('titulo').notNull()
      table.string('descricao').notNull()
      table.string('preco').notNull()
      table.longtext('imagem').notNull()
      table.timestamp('created_at').defaultTo(knex.fn.now());
    
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('lookfull')
};
