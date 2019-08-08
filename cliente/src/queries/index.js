import gql from 'graphql-tag';

const USUARIOS_QUERY = gql`{
      users{
      nombre
      id
      apellido
      typoUsers{
            nombre
      }
      fecha
      }
}`;

const PRODUCTOS_QUERY =  gql`
  query products($limit: Int, $offset: Int ){
                  products(limit:$limit, offset:$offset){
                        id 
                        nombre
                        precio
                        ruta
                        fecha
                        image{
                              imagen
                              orden
                        }
                  }
                  countProducts
  }
`;

const CATEGORYS_QUERY =  gql`
       query categorys($id_categoria : Int){
            categorys(id_categoria: $id_categoria ){
                        id
                        nombre
                        id_categoria
                        image
                        fecha
                        ruta
                        descripcion
                        activo
                  }
       }
`;

const CATEGORY_QUERY =  gql`
       query category($id : Int!){
            category(id: $id ){
                        id
                        nombre
                        id_categoria
                        image
                        fecha
                        ruta
                        descripcion
                        activo
                        subcategory{
                                    id
                                    nombre
                                    ruta
                              }
                  }
       }
`;


const PRODUCTO_QUERY =  gql`
      query bringProduct($ruta : String!){
            product(ruta : $ruta){
                  id
                  nombre
                  ruta
                  fecha
                  precio
                  descripcion
                  titulo1
                  detalles
                  vistas
                  cantidad
                  id_categoria
                  id_tipo
                  id_genero
                  image { 
                              imagen
                              orden
                              id
                        }
                  }
            }
`;
const USUARIO_ACTUAL = gql`
     query obtenerUsuario {
           obtenerUsuario{
                 mail
           }
     }

`;

export { USUARIOS_QUERY, PRODUCTOS_QUERY, PRODUCTO_QUERY, CATEGORYS_QUERY, USUARIO_ACTUAL, CATEGORY_QUERY }