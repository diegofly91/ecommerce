import fs from 'fs'
import mkdirp from 'mkdirp'
import shortid from 'shortid'
import {sequelize } from "../data/db";
import bcrypt from 'bcryptjs'


import { User, TypoUsers } from "../models/user";
import { Products, Category, ImageProduct, Ofertas, TypeOferta, Op } from "../models/products";

//generar token
import dotenv from 'dotenv'
dotenv.config({path:'variables.env'});
import jwt from 'jsonwebtoken';


const createToken = (mailUsuario, secreto, expiresIn) => {
    const {mail} = mailUsuario;
    return jwt.sign({mail}, secreto, {expiresIn});
}

const UPLOAD_DIR_PROD = '/img/productosimg';
const UPLOAD_DIR_CATE = '/img/categoriasImg';

mkdirp.sync(UPLOAD_DIR_PROD)

mkdirp.sync(UPLOAD_DIR_CATE)

const storeFS = ({ stream, filename}, directory) => {
    const id = shortid.generate()
    const path = `${directory}/${id}-${filename}`
    return new Promise((resolve, reject) =>
      stream
        .on('error', error => {
          if (stream.truncated)
            // Delete the truncated file.
            fs.unlinkSync("."+path)
          reject(error)
        })
        .pipe(fs.createWriteStream("."+path))
        .on('error', error => reject(error))
        .on('finish', () => resolve({ id, path }))
    )
  }

  const processUpload = async (req) => {
        const {id_producto, file} = req;
        const { createReadStream, filename, mimetype } = await file
        if(mimetype === "image/jpg" || mimetype === "image/png" || mimetype === "image/jpeg" ){
                const stream = createReadStream()
                const { path } = await storeFS({ stream, filename }, UPLOAD_DIR_PROD)
                const ultImag =  await ImageProduct.findAll({attributes: [
                                                                        [sequelize.fn('MAX', sequelize.col('orden')),'max']
                                                                        ], raw: true,
                                                                        where:{id_producto}
                                                        });
                var orden = 1;
                (ultImag[0] !== null) ? orden= ultImag[0].max +1 : '' 
                const newImg= await ImageProduct
                                                .build({ id_producto, imagen: path, orden})
                                                .save()
                return newImg.dataValues                                
        }                                        
  }

  const createHash = async (passw) => {  
         passw = await  bcrypt.hashSync(passw, 10, (err, hash)=>{
                if(err) return err
               return hash
            })
            return passw
};

  const processNewProduct = async (input) => {
           const fecha = new Date();
           const { nombre, precio,titulo1, detalles, descripcion, vistas, cantidad, id_categoria, id_tipo, id_genero } = input;
           const ruta = await Products.create({ nuevo: 1,fecha,nombre, 
                                                precio, titulo1, detalles, descripcion, vistas, 
                                                cantidad, id_categoria, id_tipo, id_genero }).
                                                then(task => {
                                                const id = task.dataValues.id;
                                                const ruta =  nombre.toLowerCase().replace(/[^a-z']/g, '-')+"-"+id;
                                                Products.update({ruta}, {where:{id}})
                                                return  ruta ;
        })
        return { ruta };

  }
  const processEditProduct = async (input) => {
          const { nombre, precio, titulo1, detalles, descripcion, vistas, cantidad, id_categoria, id_tipo, id_genero, id } = input;
          const ruta =  nombre.toLowerCase().replace(/[ñáéíóúÁÉÍÓÚ ]/g, "-")+"-"+id;
          await Products.update({  nombre, precio, titulo1, descripcion, detalles,
                                    vistas, cantidad, id_categoria, id_tipo, id_genero, ruta}, 
                                {where:{id}})
          return true
  }
  const processNewCategory = async (input) =>{
      const {nombre, descripcion, id_categoria, image} = await input;
      const existCateg = await Category.findOne({raw: true,where:{nombre}});
      if(existCateg)  throw new Error('la categoria ya existe');
      const ruta =  nombre.toLowerCase().replace(/[^a-z']/g, '-');
      let file='';
      if(image){
        const { createReadStream, filename, mimetype } = await image;
        if(mimetype !== "image/jpg" && mimetype !== "image/png" && mimetype !== "image/jpeg" ){
          throw new Error('el archivo no tiene el formato adecuado');
         }
         const stream = createReadStream()
         const { path } = await storeFS({ stream, filename }, UPLOAD_DIR_CATE)
         file = path;
      }
     
       const id = await Category.create({ activo: 1,nombre,descripcion,ruta, id_categoria, image: file }).
        then(task => {
        return  task.dataValues.id;
      })
      return id;
  }
  const processEditCategory = async (input) => {
    const {id,nombre,activo, descripcion, id_categoria, image} = await input;
    const existCateg = await Category.findOne({raw: true,where:{nombre,id:{ [Op.ne]: id}}});
    if(existCateg)  throw new Error('la categoria ya existe');
    const ruta =  nombre.toLowerCase().replace(/[^a-z']/g, '-');
    if(typeof(image) !== "string" ){
      const { createReadStream, filename, mimetype } = await image;
      if(mimetype !== "image/jpg" && mimetype !== "image/png" && mimetype !== "image/jpeg" ){
        throw new Error('el archivo no tiene el formato adecuado');
       }
       const stream = createReadStream()
       const { path } = await storeFS({ stream, filename }, UPLOAD_DIR_CATE)
       await Category.update({ activo,nombre,descripcion,ruta, id_categoria, image: path},{where:{id}})
    }else{
        await Category.update({ activo,nombre,descripcion,ruta, id_categoria},{where:{id}})
    }
    return "editado exitoxamente";

  }
  const processNewUser = async (input) => {
      const { nombre, apellido, telefono, passw, identificacion, tipoUsuarioId, mail} = await input;
      const existMail = await User.findAll({raw: true,where:{mail}});
      if(existMail.length > 0){
          throw new Error('El correo ya existe');
      }
      const passwh = await createHash(passw);
      const resp = User.create({nombre,apellido,telefono,passw: passwh, identificacion,tipoUsuarioId,mail}).then(task => {
         return task.dataValues;
      })
      return resp;
  }
  const processNewOfertas = async (input) => {
      const { activo,productos,fecha_inicio,fecha_fin,descuento,id_descuento} = await input;
      productos.forEach( async (element) => {
          const existOferta = await Ofertas.findOne({raw: true,where:{
                                                                        id_producto:element.id
                                                                     }
                                                   });
              console.log(existOferta)                                     
          if(existOferta){
            await Ofertas.update({ activo,fecha_inicio,fecha_fin,descuento, id_descuento },{where:{id_producto: element.id}})
          }else{
            await Ofertas.create({ activo,fecha_inicio,fecha_fin,descuento, id_descuento,id_producto: element.id })
         }
      });
      return "exito";
  }

export const resolvers = {
    User: {
        async typoUsers(users) {
            return await TypoUsers.findAll({raw: true,where:{id: users.tipoUsuarioId}});
        }
    },
    TypoUsers: {
        async users(TUsers) {
            return await User.findAll({raw: true,where:{tipoUsuarioId: TUsers.id}});
        }
    },
    Products: {
        async image(product) {
            return await ImageProduct.findAll({raw: true,where:{id_producto: product.id}});
        },
        async oferta(product){
            return await Ofertas.findOne({raw: true,where:{id_producto: product.id}});
        }
    },
    Category: {
        async subcategory(category){
            return await Category.findAll({raw: true,where:{id_categoria: category.id}});
        }
    },
    Oferta:{
        async product(oferta){
            return await Products.findOne({raw:true, where:{id: oferta.id_producto}});
        },
        async  typoDescuent(oferta){
            return await TypeOferta.findOne({raw:true, where:{id: oferta.id_descuento}})
        }
    },
    Query: {
        products: async (root,{limit, offset}) =>{
            return await Products.findAll({raw: true, limit, offset})
        },
        product: async (root, { ruta }) =>{
           return await Products.findOne({raw: true, where : {ruta}});
         },
         countProducts: async (root) => {
             return await Products.count({});
         },
         countProductsCat: async (root,{id_categoria}) => {
             return await Products.count({where:{id_categoria}});
        },
         countOfertas: async(root) =>{
            return await Ofertas.count({});
         },
         user : async(root,{ id })=>{
            return await User.findOne({raw: true, where:{id}})
         },
         users : async()=>{
            return await User.findAll({raw: true, where:{tipoUsuarioId: 2}})
         },
         TypeUsers : async() =>{
             return await TypoUsers.findAll({raw: true})
         }, 
         categorys : async(root, { id_categoria }) =>{
            if( id_categoria || id_categoria === null ){
                return await Category.findAll({raw: true, where:{ id_categoria: id_categoria }})
            }else{
                return await Category.findAll({raw: true})
            }
         },
         category : async(root, { ruta }) =>{
             return await Category.findOne({raw: true, where: {ruta}})
        },
        obtenerUsuario: (root,arg,{usuarioActual}) => {
            if(!usuarioActual){
                return null
            }
            //obtener el usuario actual del request JWT
            const usuario = User.findOne({raw:true, where:{mail: usuarioActual.mail}})
            return usuario
        },
         ofertas: async (root,{limit, offset}) =>{
            return await Ofertas.findAll({raw: true, limit, offset})
        },
        oferta: async (root,{id}) =>{
            return await Ofertas.findOne({raw:true,where:{id}})
        },
        productsCateg: async (root,{ id_categoria, limit, offset, id_producto}) => {
            if(!id_producto){
               return await Products.findAll({raw: true, limit, offset, where:{id_categoria}});
            }else{
                return await Products.findAll({raw: true, limit, offset, where:{id_categoria,id:{ [Op.ne]: id_producto}}});
            }
        }
    },
    Mutation: {
       singleUpload: async(root, { req }) =>  await  processUpload(req),
       deleteImgProduct: async(root, {id} ) => {
            const img = await ImageProduct.findOne({raw:true,where:{id}})
            const {imagen} = img;
            fs.unlinkSync("."+imagen, async (err)=>{
                if(err) throw new Error("no se pude eliminar el archivo")
            });
            await ImageProduct.destroy({ where:{ id }})
            return "se ha eliminado la imagen satisfactoriamente"
       },
       editProduct: async (root, { input }) => await processEditProduct(input),
       newProduct: async (root,{ input }) => await processNewProduct(input),
       newUser: async (root,{ input }) => await processNewUser(input),
       athenticationUser: async(root,{mail, passw}) =>{
           const mailUsuario = await User.findOne({raw: true,where:{mail}});
           if(!mailUsuario)  throw new Error('el usuario no existe');
           if(mailUsuario.tipoUsuarioId !== 1) throw new Error('el usuario no tiene permiso para este');
           const passwCorrect = await bcrypt.compare(passw, mailUsuario.passw);
           if(!passwCorrect) throw new Error('contraseña incorrecta');
           return { 
               token: createToken(mailUsuario,process.env.SECRETO,'4hr')
           }
       },
       newCategory: async(root,{input})=> await processNewCategory(input),
       editCategory: async (root,{input}) => await processEditCategory(input),
       newOferta: async (root,{input}) => await processNewOfertas(input),
       removeOferta: async(root,{id}) => {
        return await Ofertas.findOne({
                        where: { id }
                     }).then((result) => {
                        return Ofertas.destroy({ where: {id}})
                            .then((u) => { return 'exito' });
                     });
       },
      editOferta: async (root,{input}) => {
        const { activo,id,fecha_inicio,fecha_fin,descuento,id_descuento, id_producto} = await input; 
        return await Ofertas.findOne({
            where: { id }
         }).then((result) => {
            return Ofertas.update({ activo,fecha_inicio,fecha_fin,descuento, id_descuento },{where:{id}})
                .then((u) => { return 'exito' });
         });
      }
    }
}
