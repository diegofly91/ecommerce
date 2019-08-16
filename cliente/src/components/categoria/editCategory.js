import React, { Component, Fragment } from 'react'
import {CATEGORY_QUERY, CATEGORYS_QUERY} from '../../queries';
import { Query, Mutation } from 'react-apollo';
import FormCategory from './formCategory'
import {Form, Button } from 'semantic-ui-react'
import {EDIT_CATEGORY} from '../../mutations'
import swal from 'sweetalert'
import {withRouter} from 'react-router-dom'
import Error from '../Alertas/Error'
import Loading from '../Alertas/loader'

class EditCategoria extends Component {
    state = { 
             id : Number(this.props.match.params.id)
            }
    sendInfo = async (editCategory) =>{
        const info = await this.childFormCategory.categoryFinal();
        const {nombre, descripcion, id_categoria, image, id, activo} =  await info;
        if(nombre === "") {
            return swal("Campo Obligatorio!", "Debes llenar el nombre!", "error");
        }
        const input = {
            nombre,
            descripcion, 
            id_categoria,
            image,
            id,
            activo
        }
        editCategory({ variables: { input },
                        refetchQueries:[{
                                        query: CATEGORYS_QUERY, 
                                        variables:{id_categoria} 
                                        }]
                    });
    }        
    render() {
        const {id} = this.state;
        return (
            <Query query={CATEGORY_QUERY} variables={{id}} fetchPolicy="network-only" >
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
                       <Mutation 
                            mutation={ EDIT_CATEGORY }  
                            onCompleted={ async e => {
                                            swal("Se a editado la categoria!", "You clicked the button!", "success")
                                            .then((value) => {
                                                this.props.history.push("/categorias")
                                            })
                                        }}
                        >
                            {( editCategory, {loading, error, data}) => {
                                return (
                                    <Fragment>
                                        {error && <Error error={error} />} 
                                        {loading && <Loading  />} 
                                        <Form.Field
                                                control={Button}
                                                content='Editar'
                                                className="m-auto col-md-6"
                                                attached='bottom'
                                                onClick={
                                                     () => {
                                                        this.sendInfo(editCategory)
                                                }}
                                                color="blue"
                                        />
                                    </Fragment>    
                                )}}
                       </Mutation>
                   </div>
                )}}
            </Query>    
        )
    }
}
export default withRouter(EditCategoria);