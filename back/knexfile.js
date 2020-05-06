// Update with your config settings.

module.exports = {

    client: 'mysql2',
		connection: {
        database: 'prepi',
        user:     'root',
        password: '',
        host: 'localhost'
      }, 

    migrations: {
      tableName: 'knex_migrations'
    }
  };
