import React, { Component, Fragment } from 'react'
import FormCategory from './formCategory'
import {Button, Form} from 'semantic-ui-react'
import Error from '../Alertas/Error'
import Loading from '../Alertas/loader'
import { Mutation } from 'react-apollo';
import { NEW_CATEGORY } from '../../mutations'
import {CATEGORYS_QUERY} from '../../queries';
import swal from 'sweetalert'
import {withRouter} from 'react-router-dom'

class NewCategory extends Component {

    state = {
            category: {
                        nombre : '',
                        descripcion: '',
                        id_categoria: (this.props.match.params.id == 0) ? null : Number(this.props.match.params.id),
            }, 
        //    id: this.props.match.params.id
    }

    sendInfo = async (newCategory) =>{
        const info = await this.childFormCategory.categoryFinal();
        this.setState({
            category:{
                ...this.state.category,
                nombre: info.nombre,
                descripcion: info.descripcion
            }
        })
        const {nombre, descripcion, id_categoria} =  this.state.category;
        if(nombre === "") {
            return swal("Campo Obligatorio!", "Debes llenar el nombre!", "error");
        }
        const input = {
            nombre,
            descripcion, 
            id_categoria
        }
        console.log("subcategoria;;;;",id_categoria)
        newCategory({ variables: { input },
                      refetchQueries:[{
                                       query: CATEGORYS_QUERY, 
                                       variables:{id_categoria} 
                                      }]
                   });
    }
    render(){
        const { id_categoria } = this.state.category; 
        return(
            <Fragment>
                    <Mutation 
                        mutation={ NEW_CATEGORY }  
                        onCompleted={ async e => {
                                        swal("Categoria creada!", "You clicked the button!", "success")
                                        .then((value) => {
                                            this.props.history.push("/categoria/editar/"+e.newCategory)
                                        })
                                    }}
                    >
                            {( newCategory, {loading, error, data}) => {
                                return (
                                <Fragment>
                                         { id_categoria == null ? <h2>Nueva Categoria</h2>
                                                    : <h2>Nueva Subcategoria</h2>
                                         }            
                                        <FormCategory 
                                                    category={this.state.category}  
                                                    ref={instance => { this.childFormCategory = instance; }}
                                        />
                                        {error && <Error error={error} />} 
                                        {loading && <Loading  />} 
                                        <Form.Field
                                            id='form-button-control-public'
                                            control={Button}
                                            content='Confirm'
                                            className="mt-3"
                                            onClick={
                                                () => {
                                                this.sendInfo(newCategory)
                                            }}
                                            color="blue"
                                        />
                                </Fragment>
                                )     
                            }}
                    </Mutation>
            </Fragment>  
        )}
}

export default withRouter(NewCategory);