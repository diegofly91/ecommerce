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
        id: Int 
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
        activo: Boolean
        oferta: Oferta
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
        id: Int
        nombre: String!
        ruta: String!
        fecha: String
        id_categoria: Int
        image: String
        descripcion: String
        activo: Boolean
        subcategory: [Subcategory]
    }
    
    type Subcategory {
        id: Int!
        nombre: String!
        ruta: String!
        fecha: String
        id_categoria: Int
        image: String
        descripcion: String
        activo: Boolean
    }

    """ Input devuelve la ruta del nuevo producto gusradado """
     type newRutaProduct {
         ruta: String!
     }

     type TypeDescuent {
        id: Int!
        nombre: String
        simbolo: String
    }

     type Oferta {
       id: Int !
       id_producto: Int!
       descuento: Int!
       id_descuento: Int!
       activo: Boolean!
       fecha_inicio: String
       fecha_fin: String
       fecha: String
       typoDescuent: TypeDescuent
       product: Products
    }

    """ Query para ver datos de los Users"""
    type Query { 
        user (id : Int!) : User
        users: [User]
        TypeUsers : [TypoUsers]
        products(limit: Int, offset: Int ): [Products]
        product (ruta: String!): Products
        countProducts : Int
        countOfertas : Int
        countProductsCat(id_categoria: Int!): Int
        imageProduct : [ImageProduct]
        categorys (id_categoria : Int): [Category]
        category (ruta: String!): Category
        obtenerUsuario: Email
        ofertas(limit: Int, offset: Int): [Oferta]
        oferta (id: Int!):Oferta
        productsCateg (id_categoria : Int!, limit: Int, offset: Int, id_producto: Int): [Products]
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
   
    input categoryInput {
       id: Int!
       nombre: String!
       descripcion: String
       image: Upload
       id_categoria: Int
       activo: Boolean
    }

    input NewCategoryInput {
       nombre: String!
       descripcion: String!
       image: Upload
       id_categoria: Int
       activo: Boolean
    }

    input UploadFileCateg {
        id: Int
        file: Upload!
    }

    input NewOfertaInput {
       productos: [productInputOfer]!
       id_descuento: Int!
       descuento: Int!
       activo: Boolean!
       fecha_inicio: String
       fecha_fin: String
    }
    input productInputOfer {
        id: Int!
        id_categoria:Int
        nombre: String
    }
    input ofertaInput {
       id: Int !
       id_producto: Int!
       descuento: Int!
       id_descuento: Int!
       activo: Boolean!
       fecha_inicio: String
       fecha_fin: String
    }

    """ Mutation para subir un archivo"""
    type Mutation {
         singleUpload(req: UploadFile!): ImageProduct!
         deleteImgProduct(id: Int!) : String!
         editProduct(input: productInput): Boolean!
         newProduct(input: newProductInput): newRutaProduct!
         newUser(input: newUserInput): User!
         athenticationUser(mail: String!, passw:String! ): Token
         newCategory(input: NewCategoryInput): Int!
         editCategory(input: categoryInput): String!
         newOferta(input:  NewOfertaInput): String!
         removeOferta(id: Int!): String!
         editOferta(input: ofertaInput): String!
    }
    `;

export { typeDefs };
