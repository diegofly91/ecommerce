import React, { Component } from 'react'
import {CATEGORY_QUERY} from '../../queries';
import { Query } from 'react-apollo';
import FormCategory from './formCategory'
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
                const {id_categoria } = data.category;
                return (
                   <div>
                       {id_categoria ?  <h2 className="text-center col-md-12">Editar Subcategoria</h2> 
                                      : <h2 className="text-center col-md-12">Editar Categoria</h2> 
                       } 
                       <FormCategory category={data.category}  ref={instance => { this.childFormCategory = instance; }}/>
                       <Form.Field
                            control={Button}
                            content='Editar'
                            className="m-auto col-md-6"
                            attached='bottom'
                            onClick={
                                async () => {
                                    const input = await this.childFormCategory.categoryFinal();
                                     console.log(input)
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