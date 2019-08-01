import React, { Component, Fragment } from 'react';

import FormProduct   from './formProduct';


export class newProducts extends Component {
     state = { }
     render() {
         const product = {
             nombre:"",
             detalles:"",
             descripcion:"",
             id_genero: 0,
             id_categoria:1,
             precio:0,
             ruta:"",
             titulo1:"",
             vistas:"",
             image: []
         }
        return (
            <Fragment>
                 <FormProduct product={product} />
            </Fragment>    
        )
    }
}

export default newProducts