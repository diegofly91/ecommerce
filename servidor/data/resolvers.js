
import { User, TypoUsers } from "../models/user";
import { Products } from "../models/products";

export const resolvers = {
    User: {
        async typoUsers(users) {
            return await TypoUsers.findAll({where:{id: users.tipoUsuarioId}});
        }
    },
    TypoUsers: {
        async users(TUsers) {
            return await User.findAll({where:{tipoUsuarioId: TUsers.id}});
        }
    },
    Query: {
        products: async () =>{
            return await Products.findAll({})
        },
        user : async(root,{ id })=>{
            return await User.findAll({where:{id}})
         },
         users : async()=>{
            return await User.findAll({where:{tipoUsuarioId: 2}})
         },
         TypeUsers : async() =>{
             return await TypoUsers.findAll({})
         }
    }
    
}
