import {Sequelize } from 'sequelize';
import {sequelize } from "../data/db";

import { format } from 'timeago.js';


const Products = sequelize.define('productos', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: Sequelize.STRING ,  allowNull: false  },
    ruta: { type: Sequelize.STRING ,  allowNull: false  },
    precio: { type: Sequelize.FLOAT   ,allowNull: false },
    id_categoria: { type: Sequelize.INTEGER  ,allowNull: false  },
    id_tipo: { type: Sequelize.INTEGER  ,allowNull: false  },
    nuevo : { type: Sequelize.INTEGER   ,allowNull: false },
    peso : { type: Sequelize.FLOAT   ,allowNull: false },
    entrega : { type: Sequelize.INTEGER    ,allowNull: false},
    cantidad : { type: Sequelize.INTEGER    ,allowNull: false},
    id_genero : { type: Sequelize.INTEGER   ,allowNull: false },
    fecha: { type: Sequelize.DATE  ,allowNull: false  },
    detalles: { type: Sequelize.TEXT   },
    titulo1: { type: Sequelize.TEXT   },
    descripcion: { type: Sequelize.TEXT   }
  }, {
     timestamps: false
  },{
     freezeTableName: true,
  }
 );

 export { Products }; 