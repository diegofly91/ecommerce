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

const CATEGORYS_QUERY =  gql`{
     category{
            id
            nombre
            id_categoria
            image
            fecha
            ruta
       }
}`;

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

export { USUARIOS_QUERY, PRODUCTOS_QUERY, PRODUCTO_QUERY, CATEGORYS_QUERY, USUARIO_ACTUAL}