import {Sequelize } from 'sequelize';
import {sequelize } from "../data/db";


const User = sequelize.define('usuarios', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    tipoUsuarioId: {type: Sequelize.INTEGER},
    passw: Sequelize.STRING,
    telefono: Sequelize.INTEGER,
    identificacion: Sequelize.INTEGER,
    fecha: Sequelize.DATE
  }, {
     timestamps: false
  },{
     freezeTableName: true,
  }
 );

 const TypoUsers = sequelize.define('tipo_usuarios', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: Sequelize.STRING,
  }, {
    timestamps: false
  },{
    freezeTableName: true,
  }
); 


TypoUsers.associate = (models) => {
User.hasMany(models.User);
};

 User.associate = (models) => {
    User.belongsTo(models.TypoUsers);
  };


  export { User, TypoUsers }