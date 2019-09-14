
import React from 'react'
import {CATEGORYS_QUERY} from '../../queries'
import { useQuery } from 'react-apollo-hooks';
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Loading from '../Alertas/loader'
import Error from '../Alertas/Error'

export const  NavbarCateg = ({click}) => {
    const { loading, data, error} = useQuery(CATEGORYS_QUERY , {variables:{ id_categoria: null}})
    if (loading) return <Loading />;
    if (error) return <Error error={error} />
        const {categorys} = data;
        return(
            <List  horizontal className="d-flex flex-wrap justify-content-between p-4 bg-dark" >
                                             {categorys.map(item => {
                                                 return item.activo ?
                                                    <List.Item  className="mt-2" key={item.id}>
                                                        <List.Content>
                                                            <List.Header className="mt-2">
                                                                <Link  
                                                                     to={`/Tienda/${item.ruta}`} 
                                                                     className="text-white text-uppercase"
                                                                     onClick={() => { click() }}
                                                                >{item.nombre}</Link>
                                                            </List.Header>
                                                            <List.List>
                                                            {item.subcategory.map(itemS => {
                                                                return itemS.activo ?
                                                                    <List.Item key={itemS.id} className="mt-1 ml-2">
                                                                        <List.Content>
                                                                            <List.Header className="">
                                                                                <Link  onClick={() => {click() }} to={`/Tienda/${itemS.ruta}`} className="text-white">{itemS.nombre}</Link>
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
        )
}
