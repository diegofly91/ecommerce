import React, { Component } from 'react'
import {CATEGORY_QUERY} from '../../queries';
import { Query } from 'react-apollo';
import FormCategory from './formCategory'
import UploadImage from './imgCategory'
import {Form, Button } from 'semantic-ui-react'

class EditCategoria extends Component {
    state = { 
             id : Number(this.props.match.params.ruta)
            }
    render() {
        const {id} = this.state;
        return (
            <Query query={CATEGORY_QUERY} variables={{id}} >
            {({loading, error, data}) =>{
                if(loading) return "Cargando";
                if(error) return `Error ${error}`;
                console.log(data)
                const {id_categoria } = data.category;
                return (
                   <div className="d-flex flex-wrap">
                       {id_categoria ?  <h2 className="text-center col-md-12">Editar Subcategoria</h2> 
                                      : <h2 className="text-center col-md-12">Editar Categoria</h2> 
                       }                
                       <FormCategory category={data.category}/>
                       <UploadImage />
                       <Form.Field
                            control={Button}
                            content='Editar'
                            className="m-auto col-md-6"
                            attached='bottom'
                            onClick={
                                () => {
                                    console.log("hola mundo")
                            }}
                            color="blue"
                       />
                   </div>
                )}}
            </Query>    
        )
    }
}
export default EditCategoria;