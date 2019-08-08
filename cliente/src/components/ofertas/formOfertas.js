import React, { Component, Fragment } from 'react'
import {Form, Button, Checkbox } from 'semantic-ui-react'
import { CATEGORYS_QUERY, PRODUCTOS_QUERY } from '../../queries'
import {Query } from 'react-apollo'
import swal from 'sweetalert'
import {withRouter} from 'react-router-dom'
import Error from '../Alertas/Error'
import Loading from '../Alertas/loader'
import SelectInfo from './select'


class FormOferta extends Component{
    state = {
        activo: true,
        productos: '',
        categorias: ''

    }
    addCategory = (option) =>{
        this.selectProducts.clearData();
    }
    addProducts = (option) =>{
             this.selectCategory.clearData();
    }
    render(){
        const {activo} = this.state;
        return(
             <Fragment>
                 <Form>
                 <Checkbox checked={activo} 
                              toggle 
                              label="oferta desactiva/activa" 
                              className="col-md-12 d-flex justify-content-star direction"  
                              onClick={ () => { 
                                  this.setState({
                                      activo: !this.state.activo
                                  })
                              }}
                    />  
                    <p className="text-warning">escoja entre categorias o productos</p>
                    <Form.Group widths='equal'>
                        <Query query={CATEGORYS_QUERY} >
                            {({loading, error, data}) =>{
                                 if(loading) return <Loading />;
                                 if(error) return <Error  error={error} />;
                                return ( 
                                    <SelectInfo 
                                           onClick={this.addCategory} 
                                           data={data.categorys} 
                                           multi={true} 
                                           disabledOptionChild={true}
                                           ref={instance => { this.selectCategory = instance; }}/>
                                )
                            }}      
                        </Query>
                        <Query query={PRODUCTOS_QUERY} >
                                {({loading, error, data}) =>{
                                    if(loading) return <Loading />;
                                    if(error) return <Error  error={error} />;
                                    return (
                                        <SelectInfo 
                                             onClick={this.addProducts}  
                                             data={data.products} 
                                             multi={true}
                                             ref={instance => { this.selectProducts = instance; }}
                                        />
                                    )
                                }}
                        </Query>  
                    </Form.Group>
                </Form>
             </Fragment>
        )
    }
}

export default FormOferta;