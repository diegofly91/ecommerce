import gql from 'graphql-tag';

const UPLOAD_FILE =  gql`
    mutation singleUpload($req: UploadFile!){
        singleUpload(req : $req){
               id
               id_producto
               imagen
               orden
            }
    }  
`;

const EDIT_PRODUCT = gql`
   mutation editProduct($input: productInput ){
        editProduct(input: $input)
   }`;

const NEW_PRODUCT = gql`
   mutation newProduct($input: newProductInput ){
        newProduct(input: $input){
            ruta
        }
}`;

const AUTHENTICATION_USER = gql`
    mutation athenticationUser($mail: String!, $passw: String!){
        athenticationUser(mail: $mail, passw:$passw){
            token
        }
    }
`;

const REMOVE_IMG_PRPDUCT = gql`
   mutation deleteImgProduct( $id: Int!  ){
                        deleteImgProduct(id: $id)
    }
`;

export { UPLOAD_FILE, EDIT_PRODUCT, NEW_PRODUCT, AUTHENTICATION_USER, REMOVE_IMG_PRPDUCT }