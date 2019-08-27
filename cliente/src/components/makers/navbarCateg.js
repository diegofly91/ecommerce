
import React, { Component,Fragment } from 'react'
import {CATEGORYS_QUERY} from '../../queries'
import {Query} from 'react-apollo'
import {Icon, List, Transition } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class NavbarCateg extends Component {
    render(){
        return(
            <Query query={CATEGORYS_QUERY} variables={{id_categoria: null}} >
             { ({loading, error, data}) =>{
                        if(loading) return "Cargando";
                        if(error) return `Error ${error}`;
                        return (
                            <List  horizontal className="d-flex flex-wrap justify-content-between p-4" style={{background:"#000"}}>
                                 {data.categorys.map(item => {
                                     return item.activo ?
                                        <List.Item  className="mt-2" key={item.id}>
                                            <List.Content>
                                                <List.Header className="mt-2">
                                                    <Link  
                                                         to={`/Tienda/${item.ruta}`} 
                                                         className="text-white text-uppercase"
                                                         onClick={() => { this.props.onChange()}}
                                                    >{item.nombre}</Link>
                                                </List.Header>
                                                <List.List>
                                                {item.subcategory.map(itemS => {
                                                    return itemS.activo ?
                                                        <List.Item key={itemS.id} className="mt-1 ml-2">
                                                            <List.Content>
                                                                <List.Header className="">
                                                                    <Link  onClick={() => { this.props.onChange()}} to={`/Tienda/${itemS.ruta}`} className="text-white">{itemS.nombre}</Link>
                                                                </List.Header>
                                                            </List.Content>
                                                        </List.Item> : '';
                                                })}
                                                </List.List>
                                            </List.Content>
                                        </List.Item> : '';
                                    })  
                                } 
                            </List> 
                    );
                }
            }
        </Query>  
        )
    }
      
}

export default NavbarCateg;
