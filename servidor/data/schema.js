import {gql} from 'apollo-server-express';
// import  {  importSchema }  from "graphql-import";


// const typeDefs = importSchema('data/schema.graphql');

const typeDefs = gql`
""" Campos de los TypeUsers """
  type TypoUsers {
      id: Int
      nombre: String
      users: [User]
  }

""" Campos de los Users """
   type User {
       id : Int
       nombre : String
       apellido : String
       telefono : Int
       passw : String
       identificacion: Int
       tipoUsuarioId: Int
       typoUsers: [TypoUsers]
       fecha: String
   }

  """ Campos de los productos """
  
  type Products {
      id: ID 
      nombre: String
      precio: Int
      ruta: String
      fecha: String
      descripcion: String
      titulo1: String
      detalles: String
      vistas: Int
      id_categoria: Int
      id_tipo: Int
      id_genero:Int
      cantidad:Int
      image: [ImageProduct]
  } 

  type ImageProduct {
      id:ID
      id_producto: Int
      imagen: String
      orden: Int
      product: [Products]
  }

  type Category {
      id: ID!
      nombre: String!
      ruta: String!
      fecha: String
      id_categoria: Int
  }


   """ Query para ver datos de los Users"""
   type Query { 
       user (id : Int!) : User
       users: [User]
       TypeUsers : [TypoUsers]
       products: [Products]
       product (ruta: String!): Products
       imageProduct : [ImageProduct]
       category: [Category]
   }


 type File {
    id: ID!
    path: String!   
    filename: String!
    mimetype: String!
}

input UploadFile {
    id_producto: Int
    file: Upload!
}

type Mutation {
   singleUpload(req: UploadFile!): ImageProduct!
}`;

export { typeDefs };
