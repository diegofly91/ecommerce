import React, { Component, Fragment } from 'react'
import { Form, TextArea } from 'semantic-ui-react'

class FormCategory extends Component {

    state = {
        category: this.props.category,
        subcategory: this.props.category.subcategoria
    }
    categoryFinal = () => {
        return this.state.category;
    }
    render(){
        const {id, nombre, ruta, fecha, descripcion, id_categoria, image, activo} = this.state.category;
     return (
         <Fragment> 
                <div className="col-md-8 m-0 p-0 mb-2">
                { !id  
                     ?  ''
                     :  ''
                } 
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                required
                                fluid
                                placeholder='Nombre de la categoria'
                                autoFocus
                                className="col-md-6"
                                label="nombre"
                                defaultValue={nombre}
                                onChange={e =>{
                                    this.setState({
                                        category:{
                                            ...this.state.category,
                                            nombre: e.target.value
                                        }
                                    })
                                }}
                            />
                        </Form.Group>
                        <Form.Field
                            key='descripcion'
                            control={TextArea}
                            defaultValue={descripcion}
                            placeholder='descripcion'
                            label="descripcion"
                            onChange={e =>{
                                this.setState({
                                    category:{
                                        ...this.state.category,
                                        descripcion: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form>
                </div>
         </Fragment>
    )}
}

export default  FormCategory;