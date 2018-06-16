const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/members_ships_db');

const Ship = conn.define('ship', {
  name: Sequelize.STRING,
  purpose: Sequelize.STRING
});

const Member = conn.define('member', {
  name: Sequelize.STRING,
  species: Sequelize.STRING
});

const createShips = () => { 
  return Promise.all([
    Ship.create({ name: 'Enterprise', purpose: 'Explore Strange New Worlds' }),
    Ship.create({ name: 'Planet Express', purpose: 'Package Delivery' })
  ]);
}

const createMembers = () => {
  return Promise.all([
    Member.create({ name: 'Kirk', species: 'Human' }),
    Member.create({ name: 'Spock', species: 'Human-Vulcan Hybrid' }),
    Member.create({ name: 'McCoy', species: 'Human' }),
    Member.create({ name: 'Leela', species: 'Mutant' }),
    Member.create({ name: 'Fry', species: 'Human' }),
    Member.create({ name: 'Bender', species: 'Robot' })
  ]);
}

Member.belongsTo(Ship);

conn.sync({ force: true })
  .then(() => createShips())
  .then(() => createMembers());
