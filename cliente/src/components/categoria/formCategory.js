import React, { Component, Fragment } from 'react'

class FormCategory extends Component {

    state = {
        category: this.props.category,
        subcategory: this.props.category.subcategoria
    }
    render(){
        const {id, nombre, ruta, fecha, descripcion, id_categoria, image, activo} = this.state.category;
     return (
         <Fragment>
             {id  ?  <h2>Categoria a editar: {nombre}</h2> : <h2>Nueva Categoria</h2> }
         </Fragment>
    )}
}

export default  FormCategory;