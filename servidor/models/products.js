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
      vistas: { type: Sequelize.INTEGER},
      activo: { type: Sequelize.BOOLEAN}
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
         FECHA: { type: Sequelize.DATE   ,allowNull: true },
         id_categoria: { type: Sequelize.INTEGER  ,allowNull: true  },
         image:  {type: Sequelize.STRING ,  allowNull: true  },
         descripcion:  {type: Sequelize.TEXT ,  allowNull: true  },
         activo: {type:Sequelize.BOOLEAN , allowNull: false}
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


const Ofertas = sequelize.define('ofertas', {
   id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
   id_producto: { type: Sequelize.INTEGER ,  allowNull: true  },
   id_categoria: { type: Sequelize.INTEGER ,  allowNull: true  },
   descuento: { type: Sequelize.INTEGER, allowNull: false},
   tipo_descuento: { type: Sequelize.INTEGER   ,allowNull: false },
   activo: { type: Sequelize.BOOLEAN  , allowNull: false  },
   fecha_inicio:  { type: Sequelize.DATE   ,allowNull: true },
   fecha_fin:  { type: Sequelize.DATE   ,allowNull: true },
   imagen_oferta: {type:Sequelize.BOOLEAN , allowNull: true},
   fecha: { type: Sequelize.DATE   ,allowNull: true },
}, {
   timestamps: false
},{
   freezeTableName: true,
}
);

const TypeOferta = sequelize.define('tipo_oferta', {
   id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
   nombre: Sequelize.STRING,
 }, {
   timestamps: false
 },{
   freezeTableName: true,
 }
);


 export { Products, Category, ImageProduct, Op, Ofertas, TypeOferta }; 