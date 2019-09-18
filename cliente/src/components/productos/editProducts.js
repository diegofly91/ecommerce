import React, { Component, Fragment } from 'react';
import {PRODUCTO_QUERY, PRODUCTOS_QUERY} from '../../queries/index';
import { Query } from 'react-apollo';
import {useQuery} from 'react-apollo-hooks'

import FormProduct   from './formProduct';


export class editProducts extends Component {
     render() {
         const { ruta } = this.props.match.params;
        // const {data, loading, error,refetch } = useQuery(PRODUCTO_QUERY,{variables:{ruta}})  
        // if(loading) return "Cargando";
        // if(error) return `Error ${error}`;
        // const {product=[]} = data;
        return (
            <Fragment>
                <Query query={PRODUCTO_QUERY} variables={{ruta}} fetchPolicy="network-only">
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
