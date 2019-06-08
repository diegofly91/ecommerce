
import { User, TypoUsers } from "../models/user";
import { Products } from "../models/products";

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
         }
    }
    
}
