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
export { UPLOAD_FILE }