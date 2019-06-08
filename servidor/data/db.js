
import {Sequelize } from 'sequelize';
import { promisify } from 'util';

  const sequelize = new Sequelize('ecommerce2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
    define: {
        timestamps: false
    }
  })


  sequelize.authenticate = promisify(sequelize.authenticate);

  sequelize.authenticate() 
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })
  
  export { sequelize }