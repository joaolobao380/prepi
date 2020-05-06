
exports.up = function(knex) {
    return knex.schema.createTable('lookparts', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.string('descricao').notNull()
        table.integer('id_lookfull_external').notNull()
        table.string('preco').notNull()
        table.longtext('imagem').notNull()
        table.timestamp('created_at').defaultTo(knex.fn.now());
  
      
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('lookparts')
};
