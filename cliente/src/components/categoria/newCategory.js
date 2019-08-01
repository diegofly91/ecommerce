import React, { Component } from 'react'
import FormCategory from './formCategory'

class NewCategory extends Component {

    state = {

    }
    render(){
        const category = {
            nombre:"",
            descripcion:"",
            ruta: "",
        }
     return(
           
        <FormCategory category={category}/>
     
    )}
}

export default  NewCategory;