const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/ships_db');

const Ship = conn.define('ship', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  purpose: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Member = conn.define('member', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  species: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const seed = () => {
  return Promise.all([
    Ship.create({ name: 'Enterprise', purpose: 'exploration' }),
    Ship.create({ name: 'Planet Express', purpose: 'delivery' }),
    Member.create({ name: 'Kirk', species: 'human' }),
    Member.create({ name: 'Spock', species: 'hybrid' }),
    Member.create({ name: 'McCoy', species: 'human' }),
    Member.create({ name: 'Leela', species: 'mutant' }),
    Member.create({ name: 'Fry', species: 'human' }),
    Member.create({ name: 'Bender', species: 'robot' })
  ])
  .then(([enterprise, planetexpress, kirk, spock, mccoy, leela, fry, bender]) => {
    return Promise.all([
      kirk.setShip(enterprise),
      spock.setShip(enterprise),
      mccoy.setShip(enterprise),
      leela.setShip(planetexpress),
      fry.setShip(planetexpress),
      bender.setShip(planetexpress)
    ]);
  })
  .catch(error => console.log(error))
};

Member.belongsTo(Ship);
Ship.hasMany(Member);

//SEARCH FOR PUROPSE OF PLANET EXPRESS:

conn.sync({ force: true })
  .then(() => seed())
  .then(() => Ship.findOne({
    where: {
      name: 'Planet Express'
    }
  }))
  .then(ship => console.log(ship.purpose))
  .catch(error => console.log(error));

//SEARCH FOR ROBOT:

// conn.sync({ force: true })
//   .then(() => seed())
//   .then(() => Member.findOne({
//     where: {
//       species: 'robot'
//     }
//   }))
//   .then(member => console.log(member.name))
//   .catch(error => console.log(error));


//SEARCH FOR LEELA'S SHIP

// conn.sync({ force: true })
//   .then(() => seed())
//   .then(() => Member.findOne({
//     where: {
//       name: 'Leela'
//     }
//   }))
//   .then(member => Ship.findById(member.shipId))
//   .then(ship => console.log(ship.name))
//   .catch(error => console.log(error));

//SEARCH FOR LEELA'S SHIP, AN EASY WAY

// conn.sync({ force: true })
//   .then(() => seed())
//   .then(() => Member.findOne({
//     where: {
//       name: 'Leela'
//     }
//   }))
//   .then(member => member.getShip())
//   .then(ship => console.log(ship.name))
//   .catch(error => console.log(error));

//SEARCH FOR ENTERPRISE CREW

// conn.sync({ force: true })
//   .then(() => seed())
//   .then(() => Ship.findOne({
//     where: {
//       name: 'Enterprise'
//     }
//   }))
//   .then(ship => Member.findAll({
//     where: {
//       shipId: ship.id
//     }
//   }))
//   .then(members => members.forEach( member => console.log(member.name)))
//   .catch(error => console.log(error));

//SEARCH FOR ENTERPRISE CREW, AN EASY WAY

// conn.sync({ force: true })
//   .then(() => seed())
//   .then(() => Ship.findOne({
//     where: {
//       name: 'Enterprise'
//     }
//   }))
//   .then(ship => ship.getMembers())
//   .then(members => members.forEach( member => console.log(member.name)))
//   .catch(error => console.log(error));
