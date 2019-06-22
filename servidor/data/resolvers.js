import fs from 'fs'
import mkdirp from 'mkdirp'
import shortid from 'shortid'
import {sequelize } from "../data/db";


import { User, TypoUsers } from "../models/user";
import { Products, Category, ImageProduct } from "../models/products";

const UPLOAD_DIR = '/productosimg'

mkdirp.sync(UPLOAD_DIR)

const storeFS = ({ stream, filename }) => {
    const id = shortid.generate()
    const path = `${UPLOAD_DIR}/${id}-${filename}`
    return new Promise((resolve, reject) =>
      stream
        .on('error', error => {
          if (stream.truncated)
            // Delete the truncated file.
            fs.unlinkSync(path)
          reject(error)
        })
        .pipe(fs.createWriteStream("."+path))
        .on('error', error => reject(error))
        .on('finish', () => resolve({ id, path }))
    )
  }

  const processUpload = async (req) => {

    const {id_producto, file} = req;
    const { createReadStream, filename } = await file
    const stream = createReadStream()
    const { path } = await storeFS({ stream, filename })
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
        }
    },
    Query: {
        products: async () =>{
            return await Products.findAll({raw: true})
        },
        product: async (root, { ruta }) =>{

           return await Products.findOne({raw: true, where : {ruta}});
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
         category : async() =>{
            return await Category.findAll({raw: true})
         }
    },
    Mutation: {
       singleUpload: async(obj, { req }) =>  await  processUpload(req)
      },
}
