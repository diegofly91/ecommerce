import React, { Component, Fragment } from 'react'
import {CATEGORY_QUERY} from '../../queries';
import { Query } from 'react-apollo';
import Loading from '../Alertas/loader'
import Error from '../Alertas/Error'
import ViewTopCateg from './subComponents/viewTopCateg'
import ViewProducts from './subComponents/viewProducts'
import ViewProduct from './subComponents/viewProduct'

class MarketProducts extends Component{
    state = {
        ruta: this.props.match.params.ruta,
        cate: false,
        id_categoria: ''
    }
    saveInfo(data) {
        if(data.category){
            this.setState({
                    ...this.state,
                    cate: true,
                    id_categoria: data.category.id
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.ruta == this.state.ruta){
          return;
        }else {
         this.setState({
             ruta: nextProps.match.params.ruta
         })
        }
    }
    render(){
        const {ruta, cate} = this.state;
        return (<Fragment>
                 <Query query={CATEGORY_QUERY} variables={{ruta}} >
                    { ({loading, error, data}) =>{
                        if(data.category){
                             this.state.cate = true;
                             this.state.id_categoria = data.category.id
                        }
                        return (
                            <Fragment>
                                {error && <Error error={error} />} 
                                {loading && <Loading  />} 
                                {data.category? 
                                    (data.category.activo)?
                                    <Fragment>
                                        <ViewTopCateg categoria={data.category} />
                                        <ViewProducts data={this.state} />
                                    </Fragment>
                                    : "":<ViewProduct ruta={ruta} />
                                }
                            </Fragment>
                        )
                    }}
                </Query>
            </Fragment>    
        )
    }
}

export default MarketProducts;