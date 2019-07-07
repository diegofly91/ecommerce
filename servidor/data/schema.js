import {gql} from 'apollo-server-express';

const typeDefs = gql`
    """ Campos de los TypeUsers """
    type TypoUsers {
        id: Int
        nombre: String
        users: [User]
    }
    type Token {
        token: String!
    }
    type Email {
        mail: String
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

    """ Campos de imagenes producto"""
    type ImageProduct {
        id:Int
        id_producto: Int
        imagen: String
        orden: Int
        product: [Products]
    }

    """ Campos de Categoria"""
    type Category {
        id: Int!
        nombre: String!
        ruta: String!
        fecha: String
        id_categoria: Int
    }
    
    """ Input devuelve la ruta del nuevo producto gusradado """
     type newRutaProduct {
         ruta: String!
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
        obtenerUsuario: Email
    }

    """ Input de los dartos que necesitas para subir una imagen de un producto"""
    input UploadFile {
        id_producto: Int
        file: Upload!
    }

    """Input para usuario nuevo"""
    input newUserInput {
        nombre : String!
        apellido : String
        telefono : Int
        passw : String!
        identificacion: Int
        tipoUsuarioId: Int
        mail: String!
    }


    """ Input para los productos"""
    input productInput {
        id: ID!
        nombre: String!
        precio: Int!
        descripcion: String
        titulo1: String
        detalles: String
        id_categoria: Int!
        id_tipo: Int!
        id_genero:Int!
        cantidad:Int!
    }

    input newProductInput {
        nombre: String!
        precio: Int!
        descripcion: String
        titulo1: String
        detalles: String
        id_categoria: Int!
        id_tipo: Int!
        id_genero:Int!
        cantidad:Int!
    }

    """ Mutation para subir un archivo"""
    type Mutation {
         singleUpload(req: UploadFile!): ImageProduct!
         editProduct(input: productInput): Boolean!
         newProduct(input: newProductInput): newRutaProduct!
         newUser(input: newUserInput): User!
         athenticationUser(mail: String!, passw:String! ): Token
    }
    `;

export { typeDefs };
