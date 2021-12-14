const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

// Note: Calls the function for DB connection, create the db and tables if not exist and sync all models with the DB
initialize();

async function initialize() {
    
	// Create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
	
	// Note: Not really needed while the DB was created before the use of the application !
     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    	
	// Note: Try to connect to DB with the remote MySQL host name and it works !
	const sequelize = new Sequelize(database, user, password, { host: host, dialect: 'mysql' });
    
	// Note: Try to connet to DB but this will fail because it calls localhost by default !
    // const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
		
    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

    // define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    
	// https://sequelize.org/master/manual/model-basics.html
	// - This statement creates all tables if they dont exist and does nothing if they already exists
    await sequelize.sync();
	
	// Some other ways to use the sync:
	//  - These two statements creates the tables Account and RefreshToken if they dont exist and does nothing if they already exists
	// await db.Account.sync();
	// await db.RefreshToken.sync();
	
	// - This checks what is the current state of the table Account in the database (which columns it has, what are their  
	// data types, etc), and then performs the necessary changes in the table to make it match the model.
    // await db.Account.sync({ alter: true });
	
	// - This statement will (re)create the table Account and all data will be lost !
	// await db.Account.sync({ force: true });
	
}