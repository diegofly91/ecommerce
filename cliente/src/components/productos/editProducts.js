import React, { Component, Fragment } from 'react';
import {PRODUCTO_QUERY} from '../../queries/index';
import { Query, Mutation } from 'react-apollo';


import FormProduct   from './formProduct';


export class editProducts extends Component {
     state = { }
     render() {
        const { ruta } = this.props.match.params;
        return (
            <Fragment>
                <Query query={PRODUCTO_QUERY} variables={{ruta}}>
                      {({loading, error, data, refetch}) =>{
                          if(loading) return "Cargando";
                          if(error) return `Error ${error}`;
                          return ( 
                             <Fragment>
                                         <FormProduct product={data.product} refetch={refetch} />
                             </Fragment> 
                            
                          );
                      }}
                </Query>
            </Fragment>    
        )
    }
}

export default editProducts
