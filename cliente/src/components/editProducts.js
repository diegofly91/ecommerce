import React, { Component, Fragment } from 'react';
import {PRODUCTO_QUERY} from '../queries/index';
import { Query } from 'react-apollo';

import FormProduct   from '../components/formProduct';


export class editProducts extends Component {
     state = { }
     render() {
        const { ruta } = this.props.match.params;
        return (
            <Fragment>
                <Query query={PRODUCTO_QUERY} variables={{ruta}}>
                      {({loading, error, data}) =>{
                          if(loading) return "Cargando";
                          if(error) return `Error ${error}`;
                          return ( 
                              <FormProduct product={data.product} />
                          );
                      }}
                </Query>
            </Fragment>    
        )
    }
}

export default editProducts
