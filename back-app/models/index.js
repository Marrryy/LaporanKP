'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
  // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)

    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Job.belongsTo(db.Company, {
  as: "Company",
  foreignKey: {
    name: "idCompany",
    allowNull: false
  },
  targetKey: "id"
});
db.Company.hasMany(db.Job, {
  foreignKey: "idCompany",
  sourceKey: "id"
});


db.Company.belongsTo(db.User, {
  as: "User",
  foreignKey: {
    name: "postBy",
    allowNull: false
  },
  targetKey: "id"
});
db.User.hasMany(db.Company, {
  foreignKey: "postBy",
  sourceKey: "id"
});


db.Employee.belongsTo(db.User, {
  as: "User",
  foreignKey: {
    name: "postBy",
    allowNull: false
  },
  targetKey: "id"
});
db.User.hasMany(db.Employee, {
  foreignKey: "postBy",
  sourceKey: "id"
});

// Foreign key Many -><- Many
db.Skill.belongsToMany(db.Employee, {
as: "Employees",
through: {
  model: db.EmployeeSkill,
  unique: false
},
foreignKey: "idEmployee",
constraints: false
});
db.Employee.belongsToMany(db.Skill, {
as: "Skills",
through: {
  model: db.EmployeeSkill,
  unique: false
},
foreignKey: "idSkill",
constraints: false
});
db.EmployeeSkill.belongsTo(db.Skill, {
as: "Skills",
foreignKey: "idSkill",
targetKey: "id",
constraints: false
});
db.EmployeeSkill.belongsTo(db.Employee, {
as: "Employees",
foreignKey: "idEmployee",
targetKey: "id",
constraints: false
});


db.Skill.belongsToMany(db.Job, {
  as: "Jobs",
  through: {
    model: db.JobSkill,
    unique: false
  },
  foreignKey: "idJob",
  constraints: false
  });
  db.Job.belongsToMany(db.Skill, {
  as: "Skills",
  through: {
    model: db.JobSkill,
    unique: false
  },
  foreignKey: "idSkill",
  constraints: false
  });
  db.JobSkill.belongsTo(db.Skill, {
  as: "Skills",
  foreignKey: "idSkill",
  targetKey: "id",
  constraints: false
  });
  db.JobSkill.belongsTo(db.Job, {
  as: "Jobs",
  foreignKey: "idJob",
  targetKey: "id",
  constraints: false
  });


  db.Job.belongsToMany(db.Employee, {
    as: "Employees",
    through: {
      model: db.Interview,
      unique: false
    },
    foreignKey: "idEmployee",
    constraints: false
    });
    db.Employee.belongsToMany(db.Job, {
    as: "Jobs",
    through: {
      model: db.Interview,
      unique: false
    },
    foreignKey: "idJob",
    constraints: false
    });
    db.Interview.belongsTo(db.Job, {
    as: "Jobs",
    foreignKey: "idJob",
    targetKey: "id",
    constraints: false
    });
    db.Interview.belongsTo(db.Employee, {
    as: "Employees",
    foreignKey: "idEmployee",
    targetKey: "id",
    constraints: false
    });

module.exports = db;