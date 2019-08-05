import React, { Component, Fragment } from 'react'
import { Form, TextArea, Checkbox } from 'semantic-ui-react'
import SelectCategory from './selectCategory';
import UploadImage from './imgCategory'


class FormCategory extends Component {

    state = {
        category: this.props.category
    }
    categoryFinal = async () => {
        const imgNew = await this.inputImage.imgFile();
        if(imgNew){
            this.setState({
                category:{
                   ...this.state.category,
                   image: imgNew
                }
            });
        }
        if(this.state.category.id_categoria){
            const id_select = await this.selectCategory.selectCategory();
              this.setState({
                 category:{
                    ...this.state.category,
                    id_categoria: id_select
                 }
             });
        }
        return this.state.category;
    }
    render(){
        const {id, nombre, ruta, fecha, descripcion, id_categoria, image, activo} = this.state.category;
     return (
         <div className="d-flex flex-wrap"> 
                <div className="col-md-8 m-0 p-0 mb-2">
                { id  
                     ? 
                    <Checkbox checked={activo} 
                              toggle 
                              label="categoria desactiva/activa" 
                              className="col-md-12 d-flex justify-content-star direction"  
                              onClick={ () => { 
                                  this.setState({
                                      category:{
                                          ...this.state.category,
                                          activo: !this.state.category.activo
                                      }
                                  })
                              }}
                    />  
                    : ''
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
                             { id_categoria ?
                        <SelectCategory id_categoria={id_categoria}   ref={instance => { this.selectCategory = instance; }} />
                        : ''
                    }
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
                <UploadImage ruta={image}  ref={instance => { this.inputImage = instance; }} />
         </div>
    )}
}

export default  FormCategory;