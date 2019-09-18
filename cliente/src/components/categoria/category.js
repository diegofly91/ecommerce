import React, {  Fragment, Component, useEffect, useState } from 'react';
import {CATEGORYS_QUERY} from '../../queries';
import {Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {useQuery} from 'react-apollo-hooks'
import Loading from '../Alertas/loader'
import Error from '../Alertas/Error'

 const CategorysV =  () => {
  const [actual, setActual] = useState('');
  const { data, loading, error } = useQuery(CATEGORYS_QUERY,{variables:{id_categoria: null}})
  if(loading) return <Loading />
  if(error) return <Error error={error}/>
  const {categorys = []} = data;
  return (
        <Fragment >
            <div className="d-flex  justify-content-center flex-column  col-md-10 m-auto">
                <h2> Listado de Categorias</h2>  
                    <List>
                    {categorys.map( item => {
                        return item.id_categoria === null 
                        ?
                        <List.Item 
                            key={item.id}  
                            style={{cursor:'pointer', marginTop:"10px"}}
                        >
                            <List.Icon name='folder' size="big" color={item.activo ? 'blue': 'red'}/>
                            <List.Content className="align-bottom">
                                <List.Header className="mt-2">
                                    <span    
                                        onClick={ e => {
                                            (actual === item.id) ? setActual('') : setActual(item.id);
                                        } 
                                        }  
                                        className="mr-3"
                                        data-toggle="tooltip" data-placement="top" title="ver mas"
                                    >
                                        {item.nombre}
                                    </span> 
                                    <Link to={`/categoria/editar/${item.ruta}`}><Icon  circular name="edit outline" color="blue" className="mr-2" /></Link>
                                </List.Header>
                                    {   actual === item.id ? 
                                        <Box id={item.id} /> 
                                                : 
                                    ''
                                    }
                            </List.Content>
                        </List.Item>
                        : '';
                        }
                    )}
                </List>
                <List.Item>
                        <Link to={`/categoria/nueva/0`}>
                            <Icon 
                                name='plus circle' 
                                color="blue" 
                                size="big" 
                                style={{cursor:'pointer'}}
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title="agregar nueva categoria"
                            />
                    </Link>
                </List.Item>
            </div> 
    </Fragment>  
    )
}

const Box = ({id}) =>{
   const {data, loading, error} = useQuery(CATEGORYS_QUERY,{variables:{id_categoria:id}})
   if(loading) return <Loading />
   if(error) return <Error error={error} />
   const {categorys = []} = data;
   return(
    <List.List className="mt-2"> 
    {categorys.map( itemS  => {
        return id === itemS.id_categoria ?
            <List.Item key={itemS.id} className="mt-2">
                <List.Icon name='folder' size="large"  color={itemS.activo ? 'blue': 'red'}/>
                <List.Content>
                    <List.Header className="mt-2"><Link  to={`/categoria/editar/${itemS.ruta}`}>{itemS.nombre}</Link></List.Header>
                </List.Content>
            </List.Item> : '';
    })} 
    <List.Item className="mt-2">
        <Link to={`/categoria/nueva/${id}`}>
            <Icon 
                name='plus circle' 
                color="black" 
                size="large" 
                style={{cursor:'pointer'}}
            />
        </Link>
    </List.Item>
</List.List>
   )
}
   
export default class Categorys extends Component{
    render(){
      return (
        <CategorysV />
      )
    }
}