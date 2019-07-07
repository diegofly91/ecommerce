import React, { Component, Fragment } from 'react';
// import {PRODUCTO_QUERY} from '../queries/index';
// import { Query } from 'react-apollo';

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
        //const { ruta } = this.props.match.params;
        return (
            <Fragment>
                 <FormProduct product={product} />
                {/* <Query query={PRODUCTO_QUERY} variables={{ruta}}>
                      {({loading, error, data}) =>{
                          if(loading) return "Cargando";
                          if(error) return `Error ${error}`; */}
                          {/* return ( 
                              <FormProduct product={data.product} /> */}
                          {/* );
                      }}
                </Query> */}
            </Fragment>    
        )
    }
}

export default newProducts