import {Sequelize } from 'sequelize';
import {sequelize } from "../data/db";

const Op = Sequelize.Op 

const Products = sequelize.define('productos', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: { type: Sequelize.STRING ,  allowNull: false  },
      ruta: { type: Sequelize.STRING ,  allowNull: true  },
      precio: { type: Sequelize.FLOAT   ,allowNull: false },
      id_categoria: { type: Sequelize.INTEGER  ,allowNull: false  },
      id_tipo: { type: Sequelize.INTEGER  ,allowNull: false  },
      nuevo : { type: Sequelize.INTEGER   ,allowNull: false },
      cantidad : { type: Sequelize.INTEGER    ,allowNull: false},
      id_genero : { type: Sequelize.INTEGER   ,allowNull: false },
      fecha: { type: Sequelize.DATE  ,allowNull: false  },
      detalles: { type: Sequelize.TEXT   },
      titulo1: { type: Sequelize.TEXT   },
      descripcion: { type: Sequelize.TEXT  },
      vistas: { type: Sequelize.INTEGER}
   }, {
      timestamps: false
   },{
      freezeTableName: true,
   }
 );

 const Category = sequelize.define('categorias', {
         id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
         nombre: { type: Sequelize.STRING ,  allowNull: false  },
         ruta: { type: Sequelize.STRING ,  allowNull: false  },
         FECHA: { type: Sequelize.DATE   ,allowNull: false },
         id_categoria: { type: Sequelize.INTEGER  ,allowNull: false  }
      }, {
         timestamps: false
      },{
         freezeTableName: true,
      }
);

const ImageProduct = sequelize.define('imagenes_producto', {
         id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
         id_producto: {type: Sequelize.INTEGER},
         imagen: { type: Sequelize.STRING ,  allowNull: false  },
         orden: { type: Sequelize.INTEGER ,  allowNull: false  }
      }, {
         timestamps: false
      },{
         freezeTableName: true,
      }
);

// ImageProduct.associate = (models) => {
//     Products.hasMany(models.Products);
// };

//    Products.associate = (models) => {
//       Products.belongsTo(models.ImageProduct);
//    };

 export { Products, Category, ImageProduct, Op }; 