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
                        id_categoria
                        image{
                              imagen
                              orden
                        }
                        oferta{
                              id
                              descuento
                              id_descuento
                              activo
                              typoDescuent{
                                          id 
                                          simbolo
                                    }
                        }
                  }
                  countProducts
  }
`;
const PRODUCTOS_OFERTA_QUERY =  gql`
  query products($limit: Int, $offset: Int ){
                  products(limit:$limit, offset:$offset){
                        id 
                        id_categoria
                        nombre
                  }
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
                        subcategory{
                              id
                              nombre
                              id_categoria
                              ruta
                              activo
                              ruta
                        }
                  }
       }
`;

const CATEGORY_QUERY =  gql`
       query category($ruta : String!){
            category(ruta: $ruta ){
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

const PRODUCTS_CATEG_QUERY = gql`
    query productsCateg($id_categoria : Int!, $limit: Int, $offset: Int, $id_producto: Int) {
      productsCateg(id_categoria : $id_categoria, limit: $limit,offset:$offset, id_producto:$id_producto){
            id
            nombre
            precio 
            ruta
            image{
            imagen
            }
            oferta{
            descuento
            activo
            fecha_inicio
            fecha_fin
            typoDescuent{
                  simbolo
            }
            }
      },
      countProductsCat(id_categoria : $id_categoria)
}`;

const OFERTA_QUERY =  gql`
       query oferta($id : Int!){
            oferta(id: $id ){
                  id_descuento
                  descuento
                  id_descuento
                  activo
                  fecha_inicio
                  fecha_fin
                  product{
                        id
                        nombre
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
                  oferta{
                        descuento
                        activo 
                        fecha_inicio
                        fecha_fin
                        typoDescuent{
                              simbolo
                        }
                  }
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
const OFERTAS_QUERY =  gql`
  query ofertas($limit: Int, $offset: Int ){
            ofertas(limit:$limit, offset:$offset){
                  id 
                  id_producto
                  id_descuento
                  descuento
                  activo,
                  fecha,
                  fecha_inicio,
                  fecha_fin,
                  product {
                  id
                  nombre
                  ruta
                  image{
                        imagen 
                        }
                  }
                  typoDescuent{
                        id 
                        nombre
                        simbolo
                  }
            }
            countOfertas
  }
`;

export { PRODUCTS_CATEG_QUERY,OFERTA_QUERY,OFERTAS_QUERY,PRODUCTOS_OFERTA_QUERY,USUARIOS_QUERY, PRODUCTOS_QUERY, PRODUCTO_QUERY, CATEGORYS_QUERY, USUARIO_ACTUAL, CATEGORY_QUERY }